import { isAxiosError } from "axios"
import api from "@/lib/axios"
import { Note, NoteFormData, Project, Task } from "../types"

type NoteApiType = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id']
}
//Elimina al usuario del proyecto
export async function createNote ({projectId, taskId, formData} : Pick<NoteApiType, 'projectId'| 'taskId'|'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error) //genera un error
        }
    }
}

export async function deleteNote ({projectId, taskId, noteId} : Pick<NoteApiType, 'projectId'| 'taskId'|'noteId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const {data} = await api.delete<string>(url)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error) //genera un error
        }
    }
}
