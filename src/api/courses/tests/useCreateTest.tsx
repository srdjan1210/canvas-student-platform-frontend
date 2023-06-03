import { useAxios } from '../../useAxios'
import { TestData } from '../../../scores/components/create-test-form.component'
import { toast } from 'react-toastify'

export const useCreateTest = () => {
    const { axios } = useAxios()

    const createTest = async ({
        course,
        ...data
    }: TestData & { course: string }): Promise<{ error?: string }> => {
        try {
            await axios.post(`/scores/courses/${course}/tests`, data)
            toast.success('Successfully created test!')
            return {}
        } catch (e: any) {
            toast.error(e.response?.data?.message)
            return { error: e.response?.data?.message }
        }
    }

    return { createTest }
}
