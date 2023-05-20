import { useAxios } from '../useAxios'

export const useGetCourseStudents = () => {
    const { axios } = useAxios()

    const getCourseStudents = async (
        course: string,
        page: number,
        limit = 10
    ) => {
        try {
            const resp = await axios.get(`/courses/${course}/students`, {
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
        getCourseStudents,
    }
}
