import { useAxios } from '../../useAxios'
import { toast } from 'react-toastify'

export const useUploadTestFile = () => {
    const { axios } = useAxios()

    const uploadTestFile = async (
        title: string,
        testId: number,
        file: File
    ) => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            await axios.patch(
                `/scores/courses/${title}/${testId}/submit`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            toast.success('Successfully submited file!', {
                position: 'bottom-right',
            })
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message, { position: 'bottom-right' })
        }
    }
    return {
        uploadTestFile,
    }
}
