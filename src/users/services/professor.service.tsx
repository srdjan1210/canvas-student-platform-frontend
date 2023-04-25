import { useAxios } from '../../shared/services/axios-instance'
import { ProfessorRegistrationDto } from '../../store/auth-store/dtos/professor-registration.dto'
import { toast } from 'react-toastify'

export const useProfessorService = () => {
    const { axios } = useAxios()

    const searchProfessors = async (search: string, page = 1, limit = 10) => {
        try {
            const resp = await axios.get('/specialization/professors', {
                params: {
                    page,
                    limit,
                    search,
                },
            })
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

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
        searchProfessors,
    }
}
