import { useParams } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'
import { FileBoxOverview } from '../components/files/file-box-overview.component'
import { CourseFile } from '../model/course-file.model'
import { useEffect, useState } from 'react'
import { SideAnnouncements } from '../components/side-announcements.component'
import { Announcement } from '../model/announcement.model'
import { FileSearchBar } from '../components/files/file-search-bar.component'
import { download } from '../../shared/utils/download'
import { useApplicationStore } from '../../store/application.store'
import { FileListOverview } from '../components/files/file-list-overview.component'
import { ANNOUNCEMENTS_MOCK } from '../mock/mock'
import { toast } from 'react-toastify'
import useCourseService from '../services/course.service'

export const CoursePage = () => {
    const { name } = useParams()
    const [files, setFiles] = useState<CourseFile[]>([])
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [currentFolder, setCurrentFolder] = useState<string>(name ?? '')
    const layoutType = useApplicationStore((state) => state.boxType)
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const spinner = useApplicationStore((state) => state.spinner)
    const { listFiles, getDownloadUrl, createFolder, uploadFile } =
        useCourseService()

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
        download(link, filename)
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

    const uploadNewFile = async (file: File | null) => {
        if (file != null) {
            setSpinner(true)
            await uploadFile(file, currentFolder)
            await listFolderFiles()
            setSpinner(false)
        }
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
                    onUploadFile={uploadNewFile}
                    course={name ?? ''}
                />
                {layoutType === 'grid' ? (
                    <FileBoxOverview
                        files={files}
                        goToFolder={(folder: string) => goToFolder(folder)}
                        downloadFile={(file) => downloadFile(file)}
                        goBack={() => goBack()}
                        isFolderRoot={currentFolder === name}
                    />
                ) : (
                    <FileListOverview
                        files={files}
                        goToFolder={(folder: string) => goToFolder(folder)}
                        downloadFile={(file) => downloadFile(file)}
                        goBack={() => goBack()}
                        isFolderRoot={currentFolder === name}
                    />
                )}
            </Flex>
            <SideAnnouncements announcements={announcements} />
            {spinner && (
                <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                    w={'100%'}
                    h={'100%'}
                    background={'rgba(1, 1, 1, 0.5)'}
                >
                    <Spinner boxSize={40} color={'white'} />
                </Flex>
            )}
        </Flex>
    )
}
export default CoursePage
