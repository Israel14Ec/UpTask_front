import { Outlet, Link, Navigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Logo from "@/components/Logo"
import {NavMenu} from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"


export default function AppLayout() {
    
    const {data, isError, isLoading } = useAuth()

    //Cuando cierro la sesión como invalido el queryKey vuelve a ejecutar
    if(isLoading) return 'Cargando ...'
    if(isError) {
        return <Navigate  to='/auth/login'/>
    }

    if(data) return (
    <>
        <header
            className=" bg-gray-800 py-3"
        >
            <div className=" max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className=" w-56">
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                    
                </div>

                <NavMenu
                    name={data.name}
                />
            </div>  
        </header>

        <section className=" max-w-screen-xl mx-auto mt-10 p-5">
            <Outlet/>
        </section>

        <footer className=" py-4">
            <p className=" text-center">Todos los derechos reservados {new Date().getFullYear()} </p>
        </footer>

        { /* instancio el componente toastify */}
        <ToastContainer 
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
