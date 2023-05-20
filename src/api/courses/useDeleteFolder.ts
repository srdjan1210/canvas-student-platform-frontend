import { useAxios } from '../useAxios'
import { toast } from 'react-toastify'

export const useDeleteFolder = () => {
    const { axios } = useAxios()

    const deleteFolder = async (folder: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            await axios.delete(`courses/folder/${encoded}`)
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
            return null
        }
    }
    return {
        deleteFolder,
    }
}
