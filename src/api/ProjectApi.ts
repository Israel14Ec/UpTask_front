import api from "../lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema, editProjectSchema, projectSchema } from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData : ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error) //Lanzo el error
        }
    }
}

export async function getProjects() {
    try {
    
        const { data } = await api.get('/projects')
        const response = dashboardProjectSchema.safeParse(data)    //Schema de zod
        if(response.success) {
            return response.data 
        }

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error) //Lanzo el error
        }
    }
}

export async function getProjectById(id: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = editProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error) //Lanzo el error
        }
    }
}

export async function getFullProject(id: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = projectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error) //Lanzo el error
        }
    }
}


type ProjectAPi= {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export async function updateProject ({formData, projectId} : ProjectAPi) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData) //Uso un generic para decir que data es un string
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error) //Lanzo el error
        }
    }
}


export async function deleteProject (id : Project['_id']) {
    try {
        const url = `/projects/${id}`
        const { data } = await api.delete<string>(url) //Uso un generic para decir que data es un string
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data.error) //Lanzo el error
        }
    }
}