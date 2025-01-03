
import { isAxiosError } from "axios";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";

export async function updateProfile (formData: UserProfileForm) {
    try {
        const url = '/auth/profile'
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error) //genera un error
        }
    }
}

export async function changePassword (formData: UpdateCurrentUserPasswordForm) {
    try {
        const url = '/auth/update-password'
        const { data } = await api.post<string>(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error) //genera un error
        }
    }
}