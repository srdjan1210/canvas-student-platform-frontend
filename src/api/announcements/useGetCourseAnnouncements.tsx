import { useAxios } from '../useAxios'
import { useResponseState } from '../useResponseState'
import { Announcement } from '../../announcements/model/announcement.model'

export const useGetCourseAnnouncements = () => {
    const { axios } = useAxios()
    const {
        setLoading,
        setSuccess,
        setError,
        state: courseAnnouncementsState,
    } = useResponseState<Announcement[]>([])
    const getCourseAnnouncements = async (
        title: string
    ): Promise<Announcement[]> => {
        try {
            setLoading()
            const resp = await axios.get(`/courses/${title}/announcements`)
            setSuccess()
            return resp.data
        } catch (e: any) {
            setError()
            console.log(e)
            return []
        }
    }

    return {
        getCourseAnnouncements,
        courseAnnouncementsState,
    }
}
