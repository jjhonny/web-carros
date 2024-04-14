import { useState, useEffect } from "react";
import { Container } from "../../components/container";
import { Link } from "react-router-dom";
import { collection, query, getDocs, orderBy, } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, orderBy("created", "desc"))

      getDocs(queryRef)
        .then((snapshot) => {
          let listcars = [] as CarsProps[];

          snapshot.forEach((doc) => {
            listcars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid
            })
          })
          setCars(listcars)
        })
    }

    loadCars();
  }, [])

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id])
  }

  return (
    <>
      <Container>
        <section className="bg-white flex justify-center items-center gap-2 mx-auto p-4 rounded-lg w-full max-w-3xl">
          <input
            className="w-full border-2 rounded-lg h-9 px-3 outline-none"
            type="text"
            placeholder="Digite o nome do carro"
          />
          <button className="bg-red-600 h-9 px-12 rounded-lg text-white font-medium">
            Buscar
          </button>
        </section>

        <h1 className="font-bold text-center mt-10 text-2xl mb-4">
          Carros novos e usados em todo o Brasil
        </h1>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 mx-1">
          {cars.map((car) => (
            <Link key={car.id} to={`/car/${car.id}`}>
              <section className="w-full bg-white rounded-lg hover:scale-105 transition-all">
                <div
                  className="w-full h-72 rounded-lg bg-slate-200"
                  style={{ display: loadImages.includes(car.id) ? "none" : "block" }}
                >
                </div>
                <img
                  className="w-full rounded-tl-lg rounded-tr-lg mb-2 max-h-72 object-cover"
                  src={car.images[0].url}
                  alt={car.name}
                  onLoad={() => handleImageLoad(car.id)}
                  style={{ display: loadImages.includes(car.id) ? "block" : "none" }}
                />
                <p className="font-bold my-2 px-2">{car.name}</p>
                <div className="flex flex-col px-2">
                  <span className="text-zinc-700 mb-5">{car.year} • {car.km} km</span>
                  <strong className="text-black font-medium text-xl">
                    R$ {car.price}
                  </strong>
                </div>
                <div className="w-full h-px bg-slate-200 my-2"></div>
                <div className="px-2 pb-2">
                  <span className="text-zinc-700">{car.city}</span>
                </div>
              </section>
            </Link>
          ))}
        </main>
      </Container>
    </>
  );
}
