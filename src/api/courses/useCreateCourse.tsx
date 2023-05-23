import { useAxios } from '../useAxios'
import { CreateCourse } from './types/create-course.type'
import { toast } from 'react-toastify'

export const useCreateCourse = () => {
    const { axios } = useAxios()
    const createCourse = async (data: CreateCourse) => {
        try {
            await axios.post('/courses', data)
            toast.success('Successfully created course')
            return {}
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
            return { error: e.response.data.message }
        }
    }

    return {
        createCourse,
    }
}
