import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Project, TaskProject, TaskStatus } from '@/types/index'
import TaskCard from './TaskCard'
import { statusTranslations } from '@/locales/es'
import DropTask from './DropTask'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/api/TaskApi'
import { useParams } from 'react-router-dom'

type TaskListProps = {
    tasks: TaskProject[]
    canEdit:boolean
}

type GroupedTasks = {
    [key: string] : TaskProject[]
}

const initialStatusGroup : GroupedTasks = {
    pending: [],
    onHold:  [],
    inProgress: [],
    underReview: [],
    completed: []

}


//Diccionario de colores
const statusStyles : {[key: string] : string} = { //las llaves son un string y los valores son strings
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}


export default function TaskList({tasks, canEdit} : TaskListProps) {
    
    const params = useParams()
    const projectId = params.projectId!


    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            //queryClient.invalidateQueries({queryKey: ['project', projectId]})
        }
    })


    const groupedTasks = tasks.reduce((acc, task) => { //Con el reduce agrupa las tareas en el estado que corresponda
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroup);

    //Se ejecuta cuando se deja de mover la lista
    const handleDrangEnd = (e: DragEndEvent) => {
        const { over, active} = e

        //Comprueba si se arrastra al useDroppable osea DropTask
        if(over && over.id) {
            const taskId = active.id.toString() //Como se configuro el active.id tiene el id del task, espera un string
            const status = over.id as TaskStatus //Como se configuro el useDroppable (DropTask.tsx) el over.id tiene el status, tipeo el status por que espera TaskStatus

            mutate({projectId, taskId, status}) //Llamo a la mutación
            
            //Se puede agregar datos adicionales mas rapido que invalidando los queris
            queryClient.setQueryData(['project', projectId], (oldData : Project) => {
                const updateTask = oldData.tasks.map((task ) => {
                    if(task._id === taskId) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })

                return {
                    ...oldData,
                    tasks: updateTask
                }
            })
           
        } else {
            toast.warning('Arrastre y suelte a un estado')
        }
    }

    return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>
        <div className=' flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
            <DndContext onDragEnd={handleDrangEnd} /** con onDrangEnd se ejecuta cuando se deja de soltar */ >
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 
                            className={` capitalize text-xl font-semibold text-gray-500 border border-slate-300
                            bg-white px-3 py-1 border-t-8 ${statusStyles[status]}`}> 

                            {statusTranslations[status]} 
                        </h3>
                        
                        <DropTask status={status} />

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                            )}
                        </ul>
                    </div>
                ))}
            </DndContext>
        </div>
    </>
  )
}
