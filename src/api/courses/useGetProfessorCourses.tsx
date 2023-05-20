import { useAxios } from '../useAxios'

export const useGetProfessorCourses = () => {
    const { axios } = useAxios()
    const getProfessorCourses = async () => {
        try {
            const resp = await axios.get('/courses/professor')
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        getProfessorCourses,
    }
}
