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
            toast.success('Successfully removed from course!')
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.message)
        }
    }
    return {
        removeStudentFromCourse,
    }
}
