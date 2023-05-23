import { Announcement } from '../../../announcements/model/announcement.model'
import { useAxios } from '../../useAxios'
import { useResponseState } from '../../useResponseState'

export const useGetPersonalAnnouncements = () => {
    const { axios } = useAxios()
    const {
        setLoading,
        setError,
        setSuccess,
        state: announcementsState,
    } = useResponseState<Announcement[]>([])

    const getPersonalAnnouncements = async (
        page = 1,
        limit = 10
    ): Promise<Announcement[]> => {
        try {
            setLoading()
            const resp = await axios.get('/announcements/personal', {
                params: {
                    page,
                    limit,
                },
            })
            setSuccess()
            return resp.data
        } catch (e: any) {
            setError()
            console.log(e)
            return []
        }
    }

    return {
        getPersonalAnnouncements,
        announcementsState,
    }
}
