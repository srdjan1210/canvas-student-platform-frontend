import { useAxios } from '../../useAxios'
import { toast } from 'react-toastify'

export const useUploadFile = () => {
    const { axios } = useAxios()

    const uploadFile = async (file: File, folder: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            const formData = new FormData()
            formData.append('file', file)

            await axios.put(`courses/folder/${encoded}/upload/file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            toast.success('Successfully uploaded file!', {
                position: 'bottom-right',
            })
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message, { position: 'bottom-right' })
        }
    }

    return {
        uploadFile,
    }
}
