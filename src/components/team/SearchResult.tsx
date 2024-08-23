import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "@/types/index"
import { addUserToProject } from "@/api/TeamApi"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({ user, reset } : SearchResultProps) {
    
    const queryClient = useQueryClient()
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    //Mutacion para agregar al usuario al proyecto
    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true}) //Cierra el modal
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: user._id
        }
        mutate(data)
    }

    return (
    <>
        <p className=" mt-10 text-center font-bold mb-5">Resultado:</p>
        <div className=" bg-purple-50 p-5 rounded-lg">
            <div className=" flex justify-between items-center">
                <div>
                    <p className=" text-lg">{user.name}</p>
                    <p className=" text-sm text-purple-500 font-semibold"> {user.email}</p>
                </div>
                <button
                    className=" text-purple-600 hover:bg-purple-100 px-10 py-2 font-bold cursor-pointer"
                    onClick={ handleAddUserToProject}
                >
                    Agregar al proyecto
                </button>
            </div>
        </div>
    </>
  )
}
