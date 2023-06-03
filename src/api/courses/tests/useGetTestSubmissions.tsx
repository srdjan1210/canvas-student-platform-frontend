import { useAxios } from '../../useAxios'

export const useGetTestSubmissions = () => {
    const { axios } = useAxios()

    const getTestSubmissions = async (
        title: string,
        testId: number,
        page = 1,
        limit = 10
    ) => {
        try {
            const resp = await axios.get(
                `/scores/courses/${title}/tests/${testId}/submissions`,
                {
                    params: {
                        page,
                        limit,
                    },
                }
            )
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    return { getTestSubmissions }
}
