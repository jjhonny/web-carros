import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelheader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "O nome do carro é obrigatório"),
  model: z.string().min(1, "O modelo do carro é obrigatório"),
  year: z.string().min(1, "O ano do carro é obrigatório"),
  km: z.string().min(1, "O km do carro é obrigatório"),
  price: z.string().min(1, "O preço do carro é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^(\d{11,12})$/.test(value), {
    message: "Número de telefone invalido."
  }),
  description: z.string().min(1, "A descrição é obrigatória")
})

type FormData = z.infer<typeof schema>;


export function New() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <>
      <Container>
        <DashboardHeader />
        <div className="w-full bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2">
          <button className="border-2 w-48 rounded-lg flex items-center justify-center border-gray-600 h-32 md:w-48">
            <span className="absolute cursor-pointer">
              <FiUpload size={30} color="#000" />
            </span>
            <div className="cursor-pointer">
              <input type="file" accept="image/*" className="opacity-0 cursor-pointer" />
            </div>
          </button>
        </div>
        <div className="w-full bg-white rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2 mt-2 mb-4">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <p className="mb-2 font-medium">Nome do carro</p>
              <Input
                type="text"
                register={register}
                name="name"
                error={errors.name?.message}
                placeholder="Ex: Onix 1.0..."
              />
            </div>
            <div className="mb-3">
              <p className="mb-2 font-medium">Modelo do carro</p>
              <Input
                type="text"
                register={register}
                name="model"
                error={errors.model?.message}
                placeholder="Ex: 1.0 Flex Plus Manual..."
              />
            </div>
            <div className="flex w-full mb-3 flex-row items-center gap-4">
              <div className="w-1/2">
                <p className="mb-2 font-medium">Ano do carro</p>
                <Input
                  type="text"
                  register={register}
                  name="year"
                  error={errors.year?.message}
                  placeholder="Ex: 2020/2021"
                />
              </div>
              <div className="w-1/4">
                <p className="mb-2 font-medium">Km rodados</p>
                <Input
                  type="text"
                  register={register}
                  name="km"
                  error={errors.km?.message}
                  placeholder="Ex: 26.999 km"
                />
              </div>
            </div>
            <div className="mb-3">
              <p className="mb-2 font-medium">Valor em R$</p>
              <Input
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="Ex: 190.000"
              />
            </div>
            <div className="mb-3">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Florianópolis - SC"
              />
            </div>
            <div className="w-1/2 mb-3">
              <p className="mb-2 font-medium">WhatsApp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 45 992491679"
              />
            </div>
            <div className="w-full mb-3">
              <p className="mb-2 font-medium">Descrição</p>
              <textarea
                className="border-2 w-full rounded-md h-24 px-2"
                {...register("description")}
                name="description"
                id="description"
                placeholder="Digite a descrição completa do carro"
              />
              {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
            </div>


            <button type="submit" className="w-full h-11 rounded-md bg-zinc-900 text-white font-medium">Cadastrar</button>
          </form>
        </div>
      </Container>
    </>
  );
}
