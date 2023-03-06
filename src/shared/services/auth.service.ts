import { LoginDto } from '../../store/auth-store/dtos/login.dto'
import { getAxios } from './axios-instance'
import { User } from '../../store/auth-store/dtos/user.dto'
import axios, { AxiosError } from 'axios'
import { ProfessorRegistrationDto } from '../../store/auth-store/dtos/professor-registration.dto'
import { toast } from 'react-toastify'

class AuthService {
    async login({ email, password }: LoginDto) {
        try {
            const resp = await getAxios().post('/auth/login', {
                email,
                password,
            })
            toast.success('Successful login!')
            return resp.data.access_token
        } catch (e: any) {
            toast.error('Invalid credentials!')
            return null
        }
    }

    async getMe(token: string): Promise<User | null> {
        try {
            const resp = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return resp.data
        } catch (e: any) {
            return null
        }
    }

    async registerProfessor(professor: ProfessorRegistrationDto) {
        try {
            const resp = await getAxios().post(
                '/registration/professor',
                professor
            )
            return resp.data
        } catch (e: any) {
            toast.error('Registration failed!')
            return null
        }
    }
}

export const authService = new AuthService()
