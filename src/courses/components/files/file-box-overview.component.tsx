import { CourseFile } from '../../model/course-file.model'
import { Flex } from '@chakra-ui/react'
import FileView from './file-view.component'

interface Props {
    files: CourseFile[]
    goToFolder: (folder: string) => void
    downloadFile: (filename: string) => void
}

export const FileBoxOverview = ({ files, goToFolder, downloadFile }: Props) => {
    const handleClick = (file: CourseFile) => {
        if (file.type === 'folder') {
            goToFolder(file.filename)
            return
        }
        downloadFile(file.filename)
    }

    return (
        <Flex
            flexWrap={'wrap'}
            gap={20}
            overflowY={'scroll'}
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'lightgray',
                    borderRadius: '24px',
                },
                '&:hover::-webkit-scrollbar': {
                    width: '8px',
                },
            }}
        >
            {files.map((file, index) => (
                <FileView
                    key={index}
                    filename={file.filename}
                    type={file.type}
                    onClick={() => handleClick(file)}
                />
            ))}
        </Flex>
    )
}
