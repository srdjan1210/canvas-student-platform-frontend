import { useAxios } from '../../shared/services/axios-instance'
import { toast } from 'react-toastify'

export const useStudentService = () => {
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
        searchStudents,
        getStudentsWithoutGivenCourse,
        getProfessorsWithGivenCourse,
    }
}
