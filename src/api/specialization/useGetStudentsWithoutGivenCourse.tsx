import { useAxios } from '../useAxios'

export const useGetStudentsWithoutGivenCourse = () => {
    const { axios } = useAxios()
    const getStudentsWithoutGivenCourse = async (
        course = 'XML',
        search: string,
        page = 1,
        limit = 10
    ) => {
        try {
            const resp = await axios.get(
                `/specialization/students/course/${course}/not-attendee`,
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
    return { getStudentsWithoutGivenCourse }
}
