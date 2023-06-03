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
            toast.success('Successfully removed from course!', {
                position: 'bottom-right',
            })
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.message, { position: 'bottom-right' })
        }
    }
    return {
        removeProfessorFromCourse,
    }
}
