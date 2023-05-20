import { useAxios } from '../useAxios'
import { toast } from 'react-toastify'

export const useAddStudentsToCourse = () => {
    const { axios } = useAxios()

    const addStudentsToCourse = async (course: string, students: number[]) => {
        try {
            await axios.post(`/courses/${course}/students/add`, { students })
            toast.success(`Students successfully added to course ${course}!`)
            return {
                error: null,
                data: 'success',
            }
        } catch (e: any) {
            toast.error('Something wrong with commiting!')
            return {
                error: 'Something wrong with commiting',
                data: null,
            }
        }
    }

    return {
        addStudentsToCourse,
    }
}
