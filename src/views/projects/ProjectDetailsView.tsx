import { useParams, Navigate, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFullProject } from '@/api/ProjectApi'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import TaskList from '@/components/tasks/TaskList'
import EditTaskData from '@/components/tasks/EditTaskData'
import TaskModalDetails from '@/components/tasks/TaskModalDetails'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { useMemo } from 'react'

export default function ProjectDetailsView() {

  const { data: userData, isLoading: userLoading } = useAuth()
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError} = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getFullProject(projectId),
    retry: false //Evita que haga 3 llamadas a la API

  })

  const cantEdit = useMemo( () => data?.manager === userData?._id, [data, userData])

  if(isLoading && userLoading) return 'Cargando ...'
  if(isError) return <Navigate to='/404' />
  if(data && userData) return (
    <>
      <h1 className=' text-4xl font-black text-fuchsia-500'> { data.projectName} </h1>
      <p className=' text-2xl font-light text-gray-500 mt-2'> {data.description} </p>
      
      { isManager(data.manager, userData._id) &&(
        <nav className=' my-5 flex gap-3'>
          <button type='button' 
            className=' bg-purple-400 hover:bg-purple-500 px-7 py-2 text-white text-lg font-bold cursor-pointer transition-colors'
            onClick={() => navigate('?newTask=true') /**El boton agrega a la URL */}
          >
            Agregar Tarea
          </button>

          <Link
            to={'team'}
            className=' bg-fuchsia-600 hover:bg-fuchsia-700 px-7 py-2 text-white text-lg font-bold cursor-pointer transition-colors'  
          >
            Colaboradores
          </Link>
        </nav>
      )}
      <TaskList
        tasks={data.tasks}
        canEdit={cantEdit}
      />
      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}
