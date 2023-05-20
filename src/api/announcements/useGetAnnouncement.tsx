import { useAxios } from '../useAxios'

export const useGetAnnouncement = () => {
    const { axios } = useAxios()
    const getAnnouncement = async (course: string, id: number) => {
        try {
            const resp = await axios.get(
                `/courses/${course}/announcements/${id}`
            )
            console.log(resp)
            return resp.data
        } catch (e: any) {
            console.log(e)
        }
    }
    return {
        getAnnouncement,
    }
}
