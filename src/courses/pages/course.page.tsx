import { useParams } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react'
import { FileBoxOverview } from '../components/files/file-box-overview.component'
import { CourseFile } from '../model/course-file.model'
import { useEffect, useState } from 'react'
import { SideAnnouncements } from '../components/side-announcements.component'
import { Announcement } from '../model/announcement.model'
import { FileSearchBar } from '../components/files/file-search-bar.component'
import { courseService } from '../services/course.service'
import { download } from '../../shared/utils/download'
import { useApplicationStore } from '../../store/application.store'
import { FileListOverview } from '../components/files/file-list-overview.component'
import { ANNOUNCEMENTS_MOCK } from '../mock/mock'

export const CoursePage = () => {
    const { name } = useParams()
    const [files, setFiles] = useState<CourseFile[]>([])
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [currentFolder, setCurrentFolder] = useState<string>(name ?? '')
    const layoutType = useApplicationStore((state) => state.boxType)

    const goBack = () => {
        const chunks = currentFolder.split('/')
        if (chunks.length == 1) return
        const newFolder = chunks.slice(0, chunks.length - 1).join('/')
        setCurrentFolder(newFolder)
    }

    const goToFolder = (newFolder: string) => {
        setCurrentFolder(currentFolder + '/' + newFolder)
    }

    const listFiles = async () => {
        const files = await courseService.listFiles(currentFolder)
        setFiles(files as CourseFile[])
    }

    const downloadFile = async (filename: string) => {
        const link = await courseService.getDownloadUrl(currentFolder, filename)
        download(link, filename)
    }

    useEffect(() => {
        listFiles()
    }, [currentFolder])

    useEffect(() => {
        setAnnouncements(ANNOUNCEMENTS_MOCK)
    }, [])

    return (
        <Flex w={'100%'}>
            <Flex flex={5} direction={'column'} padding={10} gap={10}>
                <FileSearchBar path={currentFolder} />
                {currentFolder !== name && (
                    <Button
                        onClick={() => goBack()}
                        minH={50}
                        margin={'0 auto'}
                        w={'100%'}
                    >
                        Go Back
                    </Button>
                )}
                {layoutType === 'grid' ? (
                    <FileBoxOverview
                        files={files}
                        goToFolder={(folder: string) => goToFolder(folder)}
                        downloadFile={(file) => downloadFile(file)}
                    />
                ) : (
                    <FileListOverview
                        files={files}
                        goToFolder={(folder: string) => goToFolder(folder)}
                        downloadFile={(file) => downloadFile(file)}
                    />
                )}
            </Flex>
            <SideAnnouncements announcements={announcements} />
        </Flex>
    )
}
export default CoursePage
