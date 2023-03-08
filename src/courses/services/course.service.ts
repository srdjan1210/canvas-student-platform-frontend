import { getAxios } from '../../shared/services/axios-instance'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'

class CourseService {
    async getStudentCourses() {
        try {
            const resp = await getAxios().get('/courses/student')
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    async getProfessorCourses() {
        try {
            const resp = await getAxios().get('/courses/professor')
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    async getDownloadUrl(folder: string, file: string) {
        try {
            const encoded = encodeURIComponent(folder)
            const resp = await getAxios().get(
                `/courses/download/folder/${encoded}/file/${file}`
            )
            fileDownload(resp.data.downloadLink, '')

            return resp.data.downloadLink
        } catch (e: any) {
            console.log(e)
        }
    }

    async listFiles(folder: string) {
        try {
            const encoded = encodeURIComponent(folder)
            const files = await getAxios().get(
                `/courses/list/folder/${encoded}`
            )
            return files.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    async createFolder(folder: string) {
        try {
            const encoded = encodeURIComponent(folder)
            const files = await getAxios().post(
                `/courses/folder/${encoded}`,
                {}
            )

            toast.success('Successfully created folder')
            return files.data
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
            return null
        }
    }

    async uploadFile(file: File, folder: string) {
        try {
            const encoded = encodeURIComponent(folder)
            const formData = new FormData()
            formData.append('file', file)

            const resp = await getAxios().put(
                `courses/folder/${encoded}/upload/file`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            toast.success('Successfully uploaded file!')
            console.log(resp.data)
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
        }
    }
}

export const courseService = new CourseService()
