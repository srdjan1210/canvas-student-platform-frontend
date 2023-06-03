import { toast } from 'react-toastify'
import { useAxios } from '../useAxios'

export const useRemoveStudentFromCourse = () => {
    const { axios } = useAxios()
    const removeStudentFromCourse = async (
        course: string,
        studentId: number
    ) => {
        try {
            await axios.delete(`/courses/${course}/students/${studentId}`)
            toast.success('Successfully removed from course!', {
                position: 'bottom-right',
            })
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.message, { position: 'bottom-right' })
        }
    }
    return {
        removeStudentFromCourse,
    }
}
