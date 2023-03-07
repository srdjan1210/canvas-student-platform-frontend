import { getAxios } from '../../shared/services/axios-instance'
import fileDownload from 'js-file-download'

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
}

export const courseService = new CourseService()
