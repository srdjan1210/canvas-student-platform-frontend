import { useAxios } from '../../useAxios'
import { useResponseState } from '../../useResponseState'
import { FileTreeNode } from '../types/file-tree-node'

export const useGetFileTree = () => {
    const { axios } = useAxios()
    const {
        setLoading,
        setError,
        setSuccess,
        state: fileTreeState,
    } = useResponseState<FileTreeNode[]>([])

    const getFileTree = async (title: string): Promise<FileTreeNode[]> => {
        try {
            setLoading()
            const encoded = encodeURIComponent(title)
            const resp = await axios.get(`/courses/${encoded}/files/tree`)
            setSuccess()
            return resp.data
        } catch (e: any) {
            console.log(e)
            setError()
            return []
        }
    }

    return {
        getFileTree,
        fileTreeState,
    }
}
