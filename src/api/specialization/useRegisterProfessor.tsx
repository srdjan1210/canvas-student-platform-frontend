import { useAxios } from '../useAxios'
import { ProfessorRegistration } from '../../store/auth-store/types/professor-registration.type'
import { toast } from 'react-toastify'

export const useRegisterProfessor = () => {
    const { axios } = useAxios()

    const registerProfessor = async (professor: ProfessorRegistration) => {
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
