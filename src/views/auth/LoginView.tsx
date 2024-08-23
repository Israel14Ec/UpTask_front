import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query"; 
import ErrorMessage from "@/components/ErrorMessage";
import { Link,useNavigate } from "react-router-dom";
import { authentucateUser } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authentucateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })
  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="text-3xl font-black text-white">Iniciar sesión</h1>
      <p className="text-xl font-light text-white mt-5">
        Comienza a planear tus proyectos
        <span className=" text-fuchsia-500 font-bold"> iniciando sesión</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col">
          <label
            className="font-normal text-xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full px-3 py-2  border-gray-300 border rounded-lg"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col">
          <label
            className="font-normal text-xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full px-3 py-2  border-gray-300 border rounded-lg"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full px-3 py-2 rounded  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className=" mt-5 flex flex-col space-y-4 font-bold">
          <Link
            to={'/auth/register'}
            className=" text-center text-gray-300 "
          >¿No tienes cuenta crea una?</Link>
          
          <Link
            to={'/auth/forgot-password'}
            className=" text-center text-gray-300 "
          >¿Olvidaste tu contraseña? Reestablecer</Link>
      </nav>
    </>
  )
}