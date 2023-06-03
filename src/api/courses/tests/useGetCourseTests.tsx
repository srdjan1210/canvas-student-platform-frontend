import { useAxios } from '../../useAxios'

export const useGetCourseTests = () => {
    const { axios } = useAxios()

    const getCourseTests = async (title: string) => {
        try {
            const resp = await axios.get(`/scores/courses/${title}/tests`)
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return { getCourseTests }
}
