import { useAxios } from '../useAxios'

export const useGetStudentCourses = () => {
    const { axios } = useAxios()
    const getStudentCourses = async () => {
        try {
            const resp = await axios.get('/courses/student')
            return resp.data
        } catch (e: any) {
            return []
        }
    }
    return {
        getStudentCourses,
    }
}
