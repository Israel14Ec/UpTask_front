import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectApi"
import EditProjectForm from '@/components/projects/EditProjectForm'

export default function EditProjectView() {
  
  const params = useParams() //Uso params 
  const projectId = params.projectId! //Saco el valor del projectId que le paso en la URL 
  
  const { data, isLoading, isError} = useQuery({
    queryKey: ['editProject', projectId], //Llave de useQuery debe ser  un valor unico  por aplicación
    queryFn: () => getProjectById(projectId),
    retry: false //Intenta realizar la consulta 3 vevces por defecto, si es false ya no hacer ese comportamiento
  })

  if(isLoading) return 'cargando ...'
  if(isError) return <Navigate to='/404'/> //Lo redirige a una pagina 404
  if(data) return <EditProjectForm data={data} projectId={projectId} />
 
}
