import { useAxios } from '../useAxios'

export const useGetCourseProfessors = () => {
    const { axios } = useAxios()
    const getCourseProfessors = async (
        course: string,
        page: number,
        limit = 10
    ) => {
        try {
            const resp = await axios.get(`/courses/${course}/professors`, {
                params: {
                    page,
                    limit,
                },
            })
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        getCourseProfessors,
    }
}
