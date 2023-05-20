import { useAxios } from '../useAxios'

export const useSearchStudents = () => {
    const { axios } = useAxios()
    const searchStudents = async (search: string, page = 1, limit = 10) => {
        try {
            const resp = await axios.get('/specialization/students', {
                params: {
                    page,
                    limit,
                    search,
                },
            })
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        searchStudents,
    }
}
