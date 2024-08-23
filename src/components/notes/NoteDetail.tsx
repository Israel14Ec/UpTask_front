import { deleteNote } from "@/api/NoteApi"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { TrashIcon } from "@heroicons/react/24/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createBy._id, [data])
    const queryClient = useQueryClient()

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {  
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }   
    })

    if (isLoading) return 'Cargando ...'
    
    return (
        <div className=" p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className=" font-bold"> {note.createBy.name} </span>
                </p>
                <p className=" text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (

                <button
                    onClick={() => mutate({projectId, taskId, noteId: note._id }) }
                    type="button"
                    className=" bg-red-400 hover:bg-red-500 px-2 py-1 text-xs text-white cursor-pointer font-semibold transition-colors rounded-md"
                >   
                    <div className=" flex items-center">
                        <TrashIcon className=" w-4"/>
                        Eliminar
                    </div>
                </button>

            )}
        </div>
    )
}
