import { useAxios } from '../useAxios'
import { toast } from 'react-toastify'

export const useAddProfessorToCourse = () => {
    const { axios } = useAxios()
    const addProfessorsToCourse = async (
        course: string,
        professors: number[]
    ) => {
        try {
            await axios.post(`/courses/${course}/professors/add`, {
                professors,
            })
            toast.success(`Professors successfully added to course ${course}!`)
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
        addProfessorsToCourse,
    }
}
