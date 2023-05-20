import { useAxios } from '../useAxios'
import { toast } from 'react-toastify'

export const useImportCourseProfessors = () => {
    const { axios } = useAxios()
    const importCourseProfessors = async (course: string, file: File) => {
        try {
            console.log(file)
            const data = new FormData()
            data.append('file', file)
            const resp = await axios.post(
                `/courses/${course}/professors/parse`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            if (resp.data.length == 0) {
                toast.error('No parsed professors available for this course!')
            }
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return { importCourseProfessors }
}
