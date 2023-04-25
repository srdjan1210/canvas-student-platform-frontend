import { CourseFile } from '../../model/course-file.model'
import { Flex } from '@chakra-ui/react'
import FlatFileView from './flat-file-view.component'

interface Props {
    files: CourseFile[]
    goToFolder: (folder: string) => void
    downloadFile: (filename: string) => void
    deleteFile: (filename: string) => void
    goBack: () => void
    isFolderRoot: boolean
    search: string
}

export const FileListOverview = ({
    files,
    downloadFile,
    goToFolder,
    goBack,
    isFolderRoot,
    deleteFile,
    search,
}: Props) => {
    const handleClick = (file: CourseFile) => {
        if (file.type === 'folder') {
            goToFolder(file.filename)
            return
        }
        downloadFile(file.filename)
    }

    return (
        <Flex
            direction={'column'}
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
            {!isFolderRoot && (
                <FlatFileView
                    filename={'Go Back'}
                    type={'back'}
                    onClick={() => goBack()}
                    onDelete={() => {}}
                />
            )}
            {files.map((file, index) => (
                <>
                    {file.filename.includes(search) && (
                        <FlatFileView
                            key={index}
                            filename={file.filename}
                            type={file.type}
                            onClick={() => handleClick(file)}
                            onDelete={() => deleteFile(file.filename)}
                        />
                    )}
                </>
            ))}
        </Flex>
    )
}
