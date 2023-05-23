import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useApplicationStore } from '../store/application.store'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

export const useAxios = () => {
    const token = useApplicationStore((state) => state.token)
    const logout = useApplicationStore((state) => state.logout)
    const navigate = useNavigate()

    axiosInstance.interceptors.request.use((config) => {
        if (!config.headers.Authorization) {
            config.headers.setAuthorization(`Bearer ${token}`)
        }
        return config
    })

    axiosInstance.interceptors.response.use(
        function (response: AxiosResponse) {
            return response
        },
        function (error) {
            if (error.response.status === 401) {
                logout()
                navigate('/login')
                toast.error('Your session has expired')
            }
            return Promise.reject(error)
        }
    )
    return {
        axios: axiosInstance,
    }
}
