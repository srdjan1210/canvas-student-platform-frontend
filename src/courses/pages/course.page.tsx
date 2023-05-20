import { useParams } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'
import { FileBoxOverview } from '../components/files/file-box-overview.component'
import { CourseFile } from '../model/course-file.model'
import { useEffect, useState } from 'react'
import { SideAnnouncements } from '../components/side-announcements.component'
import { FileSearchBar } from '../components/files/file-search-bar.component'
import { download } from '../../shared/utils/download'
import { useApplicationStore } from '../../store/application.store'
import { FileListOverview } from '../components/files/file-list-overview.component'
import { ANNOUNCEMENTS_MOCK } from '../mock/mock'
import { toast } from 'react-toastify'
import { Announcement } from '../../announcements/model/announcement.model'
import { useDeleteFolder } from '../../api/courses/useDeleteFolder'
import { useDeleteFile } from '../../api/courses/useDeleteFile'
import { useUploadFile } from '../../api/courses/useUploadFile'
import { useCreateFolder } from '../../api/courses/useCreateFolder'
import { useGetDownloadUrl } from '../../api/courses/useGetDownloadUrl'
import { useListFiles } from '../../api/courses/useListFiles'

export const CoursePage = () => {
    const { name } = useParams()
    const [files, setFiles] = useState<CourseFile[]>([])
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [currentFolder, setCurrentFolder] = useState<string>(name ?? '')
    const layoutType = useApplicationStore((state) => state.boxType)
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const spinner = useApplicationStore((state) => state.spinner)
    const [search, setSearch] = useState('')
    const { listFiles } = useListFiles()
    const { getDownloadUrl } = useGetDownloadUrl()
    const { createFolder } = useCreateFolder()
    const { uploadFile } = useUploadFile()
    const { deleteFolder } = useDeleteFolder()
    const { deleteFile } = useDeleteFile()

    const goBack = () => {
        setSpinner(true)
        const chunks = currentFolder.split('/')
        if (chunks.length == 1) return
        const newFolder = chunks.slice(0, chunks.length - 1).join('/')
        setCurrentFolder(newFolder)
        setSpinner(false)
    }

    const goToFolder = (newFolder: string) => {
        setCurrentFolder(currentFolder + '/' + newFolder)
    }

    const listFolderFiles = async () => {
        setSpinner(true)
        const files = await listFiles(currentFolder)
        setFiles(files as CourseFile[])
        setSpinner(false)
    }

    const downloadFile = async (filename: string) => {
        const link = await getDownloadUrl(currentFolder, filename)
        await download(link, filename)
    }

    const createNewFolder = async (folder: string) => {
        if (folder.trim() === '') {
            toast.error('Folder name should not be empty')
            return
        }
        setSpinner(true)
        await createFolder(currentFolder + '/' + folder)
        await listFolderFiles()
        setSpinner(false)
    }

    const onDeleteFolder = async () => {
        if (currentFolder === name) return
        setSpinner(true)
        await deleteFolder(currentFolder)
        setSpinner(false)
        goBack()
    }

    const uploadNewFile = async (file: File | null) => {
        if (file != null) {
            setSpinner(true)
            await uploadFile(file, currentFolder)
            await listFolderFiles()
            setSpinner(false)
        }
    }

    const handleDeleteFile = async (filename: string) => {
        setSpinner(true)
        await deleteFile(`${currentFolder}/${filename}`)
        await listFolderFiles()
        setSpinner(false)
    }

    useEffect(() => {
        listFolderFiles()
    }, [currentFolder])

    useEffect(() => {
        setAnnouncements(ANNOUNCEMENTS_MOCK)
    }, [])

    return (
        <Flex w={'100%'} position={'relative'}>
            <Flex
                flex={5}
                direction={'column'}
                padding={10}
                justifyContent={'flex-start'}
            >
                <FileSearchBar
                    path={currentFolder}
                    onCreateFolder={createNewFolder}
                    onDeleteFolder={onDeleteFolder}
                    onUploadFile={uploadNewFile}
                    course={name ?? ''}
                    search={search}
                    onSearch={(val) => setSearch(val)}
                />
                {layoutType === 'grid' ? (
                    <FileBoxOverview
                        files={files}
                        goToFolder={(folder: string) => goToFolder(folder)}
                        downloadFile={(file) => downloadFile(file)}
                        goBack={() => goBack()}
                        isFolderRoot={currentFolder === name}
                        search={search}
                    />
                ) : (
                    <FileListOverview
                        files={files}
                        goToFolder={(folder: string) => goToFolder(folder)}
                        downloadFile={(file) => downloadFile(file)}
                        goBack={() => goBack()}
                        isFolderRoot={currentFolder === name}
                        deleteFile={(filename) => handleDeleteFile(filename)}
                        search={search}
                    />
                )}
            </Flex>
        </Flex>
    )
}
export default CoursePage
