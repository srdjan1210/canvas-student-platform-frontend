import { useAxios } from '../useAxios'
import { ProfessorRegistrationDto } from '../../store/auth-store/dtos/professor-registration.dto'
import { toast } from 'react-toastify'

export const useRegisterProfessor = () => {
    const { axios } = useAxios()

    const registerProfessor = async (professor: ProfessorRegistrationDto) => {
        try {
            await axios.post('/auth/register/professor', professor)
            toast.success('Successfully registered professor!')
        } catch (e: any) {
            toast.error('Registration failed!')
            return null
        }
    }
    return {
        registerProfessor,
    }
}
