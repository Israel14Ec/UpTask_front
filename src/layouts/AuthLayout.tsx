import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

export default function AuthLayout() {
  return (
    <>
        <div className=' bg-gray-800 min-h-screen'>
            <div className=' py-5 lg:py-10 mx-auto w-[450px]'>
                <Logo />
                <div className=' mt-10'>
                    <Outlet />        
                </div>
            </div>
        </div>

        { /* instancio el componente toastify */}
        <ToastContainer 
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
