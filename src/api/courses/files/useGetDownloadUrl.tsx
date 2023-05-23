import { useAxios } from '../../useAxios'
import fileDownload from 'js-file-download'

export const useGetDownloadUrl = () => {
    const { axios } = useAxios()

    const getDownloadUrl = async (folder: string, file: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            const resp = await axios.get(
                `/courses/download/folder/${encoded}/file/${file}`
            )
            fileDownload(resp.data.downloadLink, '')

            return resp.data.downloadLink
        } catch (e: any) {
            console.log(e)
        }
    }
    return {
        getDownloadUrl,
    }
}
