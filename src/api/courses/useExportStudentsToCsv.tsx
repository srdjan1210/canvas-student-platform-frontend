import { useAxios } from '../useAxios'
import { downloadAxios } from '../../shared/utils/download'
import { toast } from 'react-toastify'

export const useExportStudentsToCsv = () => {
    const { axios } = useAxios()
    const exportStudentsToCsv = async (title: string) => {
        try {
            const response = await axios.get(`/courses/${title}/students/csv`, {
                responseType: 'blob',
            })
            downloadAxios(response)
        } catch (e: any) {
            console.log(e)
            toast.error('Something wrong with exporting students')
        }
    }
    return {
        exportStudentsToCsv,
    }
}
