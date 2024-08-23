import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query' //Se usa mutacion para POST, PUT, DELETE, PACTH
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectApi"

export default function CreateProjectView() {
    
    const navigate = useNavigate()
    const initialValues : ProjectFormData = {
        projectName:"",
        clientName: "",
        description: ""
    }
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    //Mutacion
    const mutation = useMutation({
        mutationFn: createProject, //Función que se va a llamar en la mutación
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: ( data ) => { //Data es el valor que retorna mi función: createProject
            toast.success(data)
            navigate('/') //Redirecciona a la pagina principal
        }
    }) 

    const handleForm = (formData : ProjectFormData) => mutation.mutate(formData) //llamo a la mutación, con mutate es asincrona
    
    return (
        <>
            <div className=" max-w-3xl mx-auto">
                <h1 className=" text-4xl font-black"> Crear proyecto</h1>
                <p className=" text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

                <nav className=" my-5">
                    <Link
                        className=" bg-purple-400 hover:bg-purple-500 px-5 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
                        to="/"
                    >
                        Volver a proyectos
                    </Link>
                </nav>

                <form
                    className=" mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />
                    
                    <input 
                        type="submit" 
                        value="Crear proyecto" 
                        className=" bg-fuchsia-600 hover:bg-fuchsia-500 w-full p-3 uppercase font-bold cursor-pointer text-white transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
