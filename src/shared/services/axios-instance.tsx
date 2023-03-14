import { useApplicationStore } from '../../store/application.store'
import axios, { Axios, AxiosInstance, AxiosResponse } from 'axios'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const defaultHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json',
}

export const useAxios = () => {
    const navigate = useNavigate()
    const token = useApplicationStore((state) => state.token)
    const logout = useApplicationStore((state) => state.logout)
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

    const ax = axios.create({
        baseURL: BACKEND_URL,
        headers: {
            ...defaultHeaders,
        },
    })

    ax.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${token}`
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    ax.interceptors.response.use(
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
    return { axios: ax }
}
