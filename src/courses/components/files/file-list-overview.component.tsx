import { Flex } from '@chakra-ui/react'
import React from 'react'
import { CourseFile } from '../../model/course-file.model'
import FlatFileView from './flat-file-view.component'
import { NoFiles } from './no-files.component'

interface Props {
    files: CourseFile[]
    goToFolder: (folder: string) => void
    onFolderDelete: (folder: string) => void
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
    onFolderDelete,
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
            h={'100%'}
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
                    onFolderDelete={() => {}}
                    filename={'Go Back'}
                    type={'back'}
                    onClick={() => goBack()}
                    onDelete={() => {}}
                />
            )}
            {files.length == 0 ? (
                <NoFiles />
            ) : (
                files.map((file, index) => (
                    <React.Fragment key={index}>
                        {file.filename.includes(search) && (
                            <FlatFileView
                                filename={file.filename}
                                type={file.type}
                                onClick={() => handleClick(file)}
                                onDelete={() => deleteFile(file.filename)}
                                onFolderDelete={() =>
                                    onFolderDelete(file.filename)
                                }
                            />
                        )}
                    </React.Fragment>
                ))
            )}
        </Flex>
    )
}
