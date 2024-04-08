import { Container } from "../../components/container";

export function Home() {
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
          <section className="w-full bg-white rounded-lg hover:scale-105 transition-all">
            <img
              className="w-full rounded-tl-lg rounded-tr-lg mb-2 max-h-72 object-cover"
              src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202404/20240405/porsche-718-2.0-16v-h4-gasolina-boxster-pdk-wmimagem09535776396.jpg?s=fill&w=1920&h=1440&q=75"
              alt="Carro"
            />
            <p className="font-bold my-2 px-2">Porsche Branca</p>
            <div className="flex flex-col px-2">
              <span className="font-medium mb-5">2016/2016 • 26.999 km</span>
              <strong className="text-black font-medium text-2xl">
                R$ 190.000
              </strong>
            </div>
            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div className="px-2 pb-2">
              <span className="font-medium">Campo Grande - MS</span>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}
