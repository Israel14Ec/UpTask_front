import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/api/TaskApi';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search) //Busca los parametros que le envio en el boton Agregar Tarea
    const modalTask = queryParams.get('newTask') //Busca el parametro newTask para abrir el modal    
    const show = modalTask ? true : false //Muestra si se abre el modal o no

    const params = useParams() //Obtener projectId de la url
    const projectId = params.projectId!
    
    const initialValues : TaskFormData = {} as TaskFormData
    const { register, handleSubmit, reset, formState: {errors} } = useForm({ defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]}) //Invalido la query de detailsProject para que se actualice la vista
            toast.success(data)
            reset() //Reinicia el formulario
            navigate(location.pathname, {replace: true}) //Oculta el modal
        }
    })

    const handleCreateTask = ( formData: TaskFormData) => {
        const data = {
            formData, 
            projectId
        }
    
        mutate(data) //Una mutació solo resive un parametro
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form className=' mt-10 space-y-3' noValidate onSubmit={handleSubmit(handleCreateTask)}>
                                        <TaskForm 
                                            register={register}
                                            errors={errors}
                                        />
                                        <input 
                                            type='submit'
                                            className=" bg-fuchsia-600 hover:bg-fuchsia-500 w-full p-3 uppercase font-bold cursor-pointer text-white transition-colors"
                                            value="Guardar tarea"
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}