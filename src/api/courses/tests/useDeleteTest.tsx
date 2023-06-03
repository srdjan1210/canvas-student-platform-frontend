import { useAxios } from '../../useAxios'
import { useResponseState } from '../../useResponseState'
import { toast } from 'react-toastify'

export const useDeleteTest = () => {
    const { axios } = useAxios()
    const {
        setLoading,
        setSuccess,
        setError,
        state: deleteTestState,
    } = useResponseState<void[]>([])
    const deleteTest = async (testId: number) => {
        try {
            setLoading()
            await axios.delete(`/scores/tests/${testId}`)
            setSuccess()
            toast.success('Succesfully deleted test')
        } catch (e: any) {
            console.log(e)
            setError(e.response.data.message)
            toast.error(e.response.data.message)
        }
    }

    return { deleteTest, deleteTestState }
}
