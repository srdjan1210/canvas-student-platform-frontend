import { useAxios } from '../useAxios'

export const useGetAllCourses = () => {
    const { axios } = useAxios()

    const getAllCourses = async () => {
        try {
            const resp = await axios.get('/courses?page=1&limit=100')
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    return {
        getAllCourses,
    }
}
