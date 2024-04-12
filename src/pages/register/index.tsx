import logoImg from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const schema = z.object({
  fullname: z.string().min(6, "O campo nome completo é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .min(1, "O campo é obrigatório"),
  password: z
    .string()
    .min(1, "O campo senha é obrigatório")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.fullname,
        });
        console.log("Cadastrado com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log("Erro ao cadastrar esse usuario");
        console.log(error);
      });
  }

  return (
    <>
      <Container>
        <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
          <Link to="/login" className="mb-6 max-w-sm w-full">
            <img className="w-full" src={logoImg} alt="Logo do site" />
          </Link>
          <form
            className="bg-white max-w-xl w-full rounded-lg p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Digite seu nome completo"
                name="fullname"
                error={errors.fullname?.message}
                register={register}
              />
            </div>
            <div className="mb-3">
              <Input
                type="email"
                placeholder="Digite seu email"
                name="email"
                error={errors.email?.message}
                register={register}
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                placeholder="Digite sua senha"
                name="password"
                error={errors.password?.message}
                register={register}
              />
            </div>
            <button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-900 w-full rounded-md text-white h-11"
            >
              Cadastrar
            </button>
          </form>
          <Link to="/login">Já possui uma conta? Faça o login</Link>
        </div>
      </Container>
    </>
  );
}
