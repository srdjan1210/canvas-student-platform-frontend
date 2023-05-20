import { useAxios } from '../useAxios'

export const useGetProfessorsWithGivenCourse = () => {
    const { axios } = useAxios()
    const getProfessorsWithGivenCourse = async (
        course = 'XML',
        search: string,
        page = 1,
        limit = 10
    ) => {
        try {
            const resp = await axios.get(
                `/specialization/professors/course/${course}/not-member`,
                {
                    params: {
                        page,
                        limit,
                        search,
                    },
                }
            )
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        getProfessorsWithGivenCourse,
    }
}
