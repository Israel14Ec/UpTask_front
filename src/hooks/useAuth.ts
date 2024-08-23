import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthApi";


export const useAuth = () => {
    const {data, isError, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false //Hace que no se ejecute el query cuando salgo y entro de nuevo a la pestaña

    })

    return {
        data,
        isError,
        isLoading
    }

}