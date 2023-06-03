import { useAxios } from '../useAxios'
import { StudentRegistration } from '../../users/types/student-registration.type'
import { toast } from 'react-toastify'

export const useRegisterStudent = () => {
    const { axios } = useAxios()
    const registerStudent = async (data: StudentRegistration) => {
        try {
            await axios.post('/auth/register/student', data)
            toast.success('Successfully registered student!', {
                position: 'bottom-right',
            })
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.message, { position: 'bottom-right' })
        }
    }
    return {
        registerStudent,
    }
}
