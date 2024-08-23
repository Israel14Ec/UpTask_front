import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskApi"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search) //btiene los parametros de la URL
    const taskId = queryParams.get('editTask')! //Obtiene el id de la URL

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId, //Se ejecuta si se cumple una condicion solo acepta true o false los os !! sirva para si tiene algo esa variable devuelve true o false
        retry: false
    })


    if(isError) return <Navigate to={'/404'}/>
    if(data) return <EditTaskModal data={data} taskId={taskId}/>
}
