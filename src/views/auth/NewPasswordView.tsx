import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { confirmToken } from "@/types/index"
import { useState } from "react"

export default function NewPasswordView() {
  
  const [token, setToken] = useState<confirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)


  return (
    <>
      <h1 className="text-3xl font-black text-white">Reestablecer password</h1>
      <p className="text-xl font-light text-white mt-5">
        Ingresa el código que recibiste por email
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>

      { !isValidToken ? 
        <NewPasswordToken 
          token={token} 
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        /> 
          : 
        <NewPasswordForm token={token}/>
      }
    </>
  )
}
