import { useAxios } from '../../useAxios'

export const useGetAllStudentTestScoreWithNotSubmitted = () => {
    const { axios } = useAxios()
    const getAllStudentTestScoreWithNotSubmitted = async (title: string) => {
        try {
            const resp = await axios.get(
                `/scores/courses/${title}/tests/submissions/all`
            )
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        getAllStudentTestScoreWithNotSubmitted,
    }
}
