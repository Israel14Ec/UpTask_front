import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm" //Componente
import { Project, ProjectFormData } from "@/types/index" //Typo
import { useForm } from "react-hook-form" //React hook form
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from "@/api/ProjectApi"
import { toast } from "react-toastify"

type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EditProjectForm ( { data, projectId } : EditProjectFormProps ) {

    const navigate = useNavigate()
    
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: 
        {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
        }
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({

        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})  //Invalidar los querys - Elimina la información cacheada de la consulta y la vuelve a hacer
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]}) 
            toast.success(data)
            navigate('/')

           
        }
    })

  const handleForm = (formData : ProjectFormData) => {
    const data = {
        formData,
        projectId
    }
    mutate(data) //Los querys y las mutaciones solo toman una variable
  }

  return (
    <>
    <div className=" max-w-3xl mx-auto">
        <h1 className=" text-4xl font-black"> Editar proyecto</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>

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
                value="Guardar cambios" 
                className=" bg-fuchsia-600 hover:bg-fuchsia-500 w-full p-3 uppercase font-bold cursor-pointer text-white transition-colors"
            />
        </form>
    </div>
</>
  )
}
