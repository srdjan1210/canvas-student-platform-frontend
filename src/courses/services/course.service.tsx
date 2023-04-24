import { useAxios } from '../../shared/services/axios-instance'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'
import { downloadAxios } from '../../shared/utils/download'

export const useCourseService = () => {
    const { axios } = useAxios()

    const getAll = async () => {
        try {
            const resp = await axios.get('/courses?page=1&limit=100')
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    const getCourseStudents = async (
        course: string,
        page: number,
        limit = 10
    ) => {
        try {
            const resp = await axios.get(`/courses/${course}/students`, {
                params: {
                    page,
                    limit,
                },
            })
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    const getCourseProfessors = async (
        course: string,
        page: number,
        limit = 10
    ) => {
        try {
            const resp = await axios.get(`/courses/${course}/professors`, {
                params: {
                    page,
                    limit,
                },
            })
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }
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

    const deleteFolder = async (folder: string) => {
        try {
            const encoded = encodeURIComponent(folder)
            await axios.delete(`courses/folder/${encoded}`)
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.message)
            return null
        }
    }

    const deleteFile = async (path: string) => {
        try {
            const encoded = encodeURIComponent(path)
            await axios.delete(`courses/file/${encoded}`)
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

    const addStudentsToCourse = async (course: string, students: number[]) => {
        try {
            await axios.post(`/courses/${course}/students/add`, { students })
            toast.success(`Students successfully added to course ${course}!`)
            return {
                error: null,
                data: 'success',
            }
        } catch (e: any) {
            toast.error('Something wrong with commiting!')
            return {
                error: 'Something wrong with commiting',
                data: null,
            }
        }
    }

    const addProfessorsToCourse = async (
        course: string,
        professors: number[]
    ) => {
        try {
            await axios.post(`/courses/${course}/professors/add`, {
                professors,
            })
            toast.success(`Professors successfully added to course ${course}!`)
            return {
                error: null,
                data: 'success',
            }
        } catch (e: any) {
            toast.error('Something wrong with commiting!')
            return {
                error: 'Something wrong with commiting',
                data: null,
            }
        }
    }
    const exportStudentsToCsv = async (title: string) => {
        try {
            const response = await axios.get(`/courses/${title}/students/csv`, {
                responseType: 'blob',
            })
            downloadAxios(response)
        } catch (e: any) {
            console.log(e)
            toast.error('Something wrong with exporting students')
        }
    }
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
            toast.error('Something wrong with exporting students')
        }
    }

    const importCourseStudents = async (course: string, file: File) => {
        try {
            console.log(file)
            const data = new FormData()
            data.append('file', file)
            const resp = await axios.post(
                `/courses/${course}/students/parse`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            if (resp.data.length == 0) {
                toast.error('No parsed students available for this course!')
            }
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    const importCourseProfessors = async (course: string, file: File) => {
        try {
            console.log(file)
            const data = new FormData()
            data.append('file', file)
            const resp = await axios.post(
                `/courses/${course}/professors/parse`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            console.log(resp.data)
            if (resp.data.length == 0) {
                toast.error('No parsed professors available for this course!')
            }
            return resp.data
        } catch (e: any) {
            console.log(e)
            return []
        }
    }

    const removeStudentFromCourse = async (
        course: string,
        studentId: number
    ) => {
        try {
            await axios.delete(`/courses/${course}/students/${studentId}`)
            toast.success('Successfully removed from course!')
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.message)
        }
    }

    const removeProfessorFromCourse = async (
        course: string,
        professorId: number
    ) => {
        try {
            await axios.delete(`/courses/${course}/professors/${professorId}`)
            toast.success('Successfully removed from course!')
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.message)
        }
    }

    return {
        getStudentCourses,
        getProfessorCourses,
        getDownloadUrl,
        listFiles,
        uploadFile,
        createFolder,
        deleteFile,
        addStudentsToCourse,
        addProfessorsToCourse,
        getAll,
        getCourseStudents,
        getCourseProfessors,
        deleteFolder,
        exportStudentsToCsv,
        exportProfessorsToCsv,
        importCourseStudents,
        removeStudentFromCourse,
        importCourseProfessors,
        removeProfessorFromCourse,
    }
}

export default useCourseService
