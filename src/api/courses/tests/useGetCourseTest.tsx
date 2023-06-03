import { useAxios } from '../../useAxios'

export const useGetCourseTest = () => {
    const { axios } = useAxios()

    const getCourseTest = async (testId: number) => {
        try {
            const resp = await axios.get(`/scores/test/${testId}`)
            return resp.data
        } catch (e: any) {
            console.log(e)
        }
    }

    return { getCourseTest }
}
