import { useAxios } from '../../useAxios'
import { toast } from 'react-toastify'

export const useDeleteFile = () => {
    const { axios } = useAxios()
    const deleteFile = async (path: string) => {
        try {
            const encoded = encodeURIComponent(path)
            await axios.delete(`courses/file/${encoded}`)
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message, { position: 'bottom-right' })
            return null
        }
    }
    return {
        deleteFile,
    }
}
