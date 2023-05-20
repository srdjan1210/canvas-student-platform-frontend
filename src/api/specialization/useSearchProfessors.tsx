import { useAxios } from '../useAxios'

export const useSearchProfessors = () => {
    const { axios } = useAxios()

    const searchProfessors = async (search: string, page = 1, limit = 10) => {
        try {
            const resp = await axios.get('/specialization/professors', {
                params: {
                    page,
                    limit,
                    search,
                },
            })
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
    return {
        searchProfessors,
    }
}
