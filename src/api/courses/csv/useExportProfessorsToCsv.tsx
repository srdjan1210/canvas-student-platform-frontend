import { useAxios } from '../../useAxios'
import { downloadAxios } from '../../../shared/utils/download'
import { toast } from 'react-toastify'

export const useExportProfessorsToCsv = () => {
    const { axios } = useAxios()
    const exportProfessorsToCsv = async (title: string) => {
        try {
            const response = await axios.get(
                `/courses/${title}/professors/csv`,
                {
                    responseType: 'blob',
                }
            )
            downloadAxios(response)
        } catch (e: any) {
            console.log(e)
            toast.error('Something wrong with exporting students', {
                position: 'bottom-right',
            })
        }
    }
    return {
        exportProfessorsToCsv,
    }
}
