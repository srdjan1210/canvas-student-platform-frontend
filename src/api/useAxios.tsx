import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useApplicationStore } from '../store/application.store'
import { useEffect } from 'react'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

export const useAxios = () => {
    const token = useApplicationStore((state) => state.token)
    const logout = useApplicationStore((state) => state.logout)
    const navigate = useNavigate()

    useEffect(() => {
        const tokenInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    config.headers.setAuthorization(`Bearer ${token}`)
                }
                return config
            }
        )

        const unauthorizedInterceptor = axiosInstance.interceptors.response.use(
            function (response: AxiosResponse) {
                return response
            },
            function (error) {
                console.log(error)
                if (error.response.status === 401) {
                    logout()
                    navigate('/login')
                    toast.error('Your session has expired', {
                        position: 'bottom-right',
                    })
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(tokenInterceptor)
            axiosInstance.interceptors.response.eject(unauthorizedInterceptor)
        }
    }, [logout, navigate, token])
    return {
        axios: axiosInstance,
    }
}
