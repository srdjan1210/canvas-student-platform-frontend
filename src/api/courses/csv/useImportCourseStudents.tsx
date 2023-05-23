import { useAxios } from '../../useAxios'
import { toast } from 'react-toastify'

export const useImportCourseStudents = () => {
    const { axios } = useAxios()
    const importCourseStudents = async (course: string, file: File) => {
        try {
            console.log(file)
            const data = new FormData()
            data.append('file', file)
            const resp = await axios.post(
                `/courses/${course}/students/parse`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            if (resp.data.length == 0) {
                toast.error('No parsed students available for this course!')
            }
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        importCourseStudents,
    }
}
