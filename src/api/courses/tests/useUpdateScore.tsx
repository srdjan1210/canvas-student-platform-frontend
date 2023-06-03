import { useAxios } from '../../useAxios'
import { toast } from 'react-toastify'

export type UpdateScore = {
    title: string
    testId: number
    studentId: number
    score: number
}
export const useUpdateScore = () => {
    const { axios } = useAxios()

    const updateStudentScore = async ({
        title,
        studentId,
        testId,
        score,
    }: UpdateScore) => {
        try {
            await axios.patch(
                `/scores/evaluate/${title}/${studentId}/${testId}`,
                {
                    score,
                }
            )
            toast.success('Successfully updated points!')
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
        }
    }

    return { updateStudentScore }
}
