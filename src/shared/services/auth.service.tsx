import { ProfessorRegistrationDto } from '../../store/auth-store/dtos/professor-registration.dto'
import { toast } from 'react-toastify'
import { useAxios } from './axios-instance'

export const useAuthService = () => {
    const { axios } = useAxios()

    const registerProfessor = async (professor: ProfessorRegistrationDto) => {
        try {
            const resp = await axios.post('/registration/professor', professor)
            return resp.data
        } catch (e: any) {
            toast.error('Registration failed!')
            return null
        }
    }

    return {
        registerProfessor,
    }
}

export default useAuthService
