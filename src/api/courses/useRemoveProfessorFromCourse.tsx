import { useAxios } from '../useAxios'
import { toast } from 'react-toastify'

export const useRemoveProfessorFromCourse = () => {
    const { axios } = useAxios()

    const removeProfessorFromCourse = async (
        course: string,
        professorId: number
    ) => {
        try {
            await axios.delete(`/courses/${course}/professors/${professorId}`)
            toast.success('Successfully removed from course!')
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.message)
        }
    }
    return {
        removeProfessorFromCourse,
    }
}
