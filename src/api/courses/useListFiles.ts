import { useAxios } from '../useAxios'

export const useListFiles = () => {
    const { axios } = useAxios()
    const listFiles = async (folder: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            const files = await axios.get(`/courses/list/folder/${encoded}`)
            return files.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        listFiles,
    }
}
