import { useAxios } from '../useAxios'
import { CreateAnnouncement } from '../../announcements/types/create-announcement.type'
import { toast } from 'react-toastify'

export const useCreateAnnouncement = () => {
    const { axios } = useAxios()

    const createAnnouncement = async ({
        course,
        title,
        body,
    }: CreateAnnouncement) => {
        try {
            await axios.post(`/courses/${course}/announcements`, {
                body,
                title,
            })
            toast.success('Successfully created announcement!')
            return true
        } catch (e: any) {
            console.log(e)
            toast.error(
                e.response.message ??
                    'Something wrong with creating announcement!'
            )
            return false
        }
    }
    return {
        createAnnouncement,
    }
}
