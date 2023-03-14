import { useAxios } from '../../shared/services/axios-instance'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'

export const useCourseService = () => {
    const { axios } = useAxios()
    const getStudentCourses = async () => {
        try {
            const resp = await axios.get('/courses/student')
            return resp.data
        } catch (e: any) {
            return []
        }
    }
    const getProfessorCourses = async () => {
        try {
            const resp = await axios.get('/courses/professor')
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

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

    const createFolder = async (folder: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            const files = await axios.post(`/courses/folder/${encoded}`, {})

            toast.success('Successfully created folder')
            return files.data
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
            return null
        }
    }

    const uploadFile = async (file: File, folder: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            const formData = new FormData()
            formData.append('file', file)

            const resp = await axios.put(
                `courses/folder/${encoded}/upload/file`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            toast.success('Successfully uploaded file!')
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
        }
    }

    return {
        getStudentCourses,
        getProfessorCourses,
        getDownloadUrl,
        listFiles,
        uploadFile,
        createFolder,
    }
}

export default useCourseService
