import { useAxios } from '../../useAxios'
import { toast } from 'react-toastify'

export const useCreateFolder = () => {
    const { axios } = useAxios()

    const createFolder = async (folder: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            const files = await axios.post(`/courses/folder/${encoded}`, {})
            toast.success('Successfully created folder')
            return files.data
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
            return null
        }
    }

    return {
        createFolder,
    }
}
