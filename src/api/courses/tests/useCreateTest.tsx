import { useAxios } from '../../useAxios'
import { TestData } from '../../../courses-dashboard/components/tests/create-test-form.component'
import { toast } from 'react-toastify'

export const useCreateTest = () => {
    const { axios } = useAxios()

    const createTest = async ({
        course,
        ...data
    }: TestData & { course: string }): Promise<{ error?: string }> => {
        try {
            await axios.post(`/scores/courses/${course}/tests`, data)
            toast.success('Successfully created test!', {
                position: 'bottom-right',
            })
            return {}
        } catch (e: any) {
            toast.error(e.response?.data?.message, { position: 'bottom-right' })
            return { error: e.response?.data?.message }
        }
    }

    return { createTest }
}
