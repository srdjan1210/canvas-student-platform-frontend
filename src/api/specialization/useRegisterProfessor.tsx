import { useAxios } from '../useAxios'
import { ProfessorRegistration } from '../../store/auth-store/types/professor-registration.type'
import { toast } from 'react-toastify'

export const useRegisterProfessor = () => {
    const { axios } = useAxios()

    const registerProfessor = async (professor: ProfessorRegistration) => {
        try {
            await axios.post('/auth/register/professor', professor)
            toast.success('Successfully registered professor!', {
                position: 'bottom-right',
            })
        } catch (e: any) {
            toast.error('Registration failed!', { position: 'bottom-right' })
            return null
        }
    }
    return {
        registerProfessor,
    }
}
