import { Flex, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import {
    addProxyDefaultValue,
    extractFileExtension,
} from '../../../shared/utils/utils'
import {
    AiFillFolder,
    AiOutlineFile,
    AiOutlineFilePdf,
    AiOutlineFilePpt,
} from 'react-icons/ai'
import { FileTreeNode } from '../../../api/courses/types/file-tree-node'
import { FOLDER_GRAY_LINE } from '../../course-dashboard.constants'
import { useDroppableContainer } from '../../hooks/useDroppableContainer'
import { useUploadFile } from '../../../api/courses/files/useUploadFile'
import { FileMenuContext } from './file-menu-context.component'
import { download } from '../../../shared/utils/download'
import { useGetDownloadUrl } from '../../../api/courses/files/useGetDownloadUrl'
const FILE_SIZE = '40px'

export type FileProps = {
    filename: string
    type: 'folder' | 'file'
    subfolders: FileTreeNode[]
    parent?: string
    parentPath: string
    onFileUpload: () => void
    isOpen?: boolean
}
export const FileBranch = ({
    filename,
    type,
    subfolders,
    parent,
    parentPath,
    onFileUpload,
    isOpen = false,
}: FileProps) => {
    const [subfolderVisible, setSubfolderVisible] = useState(isOpen)
    const PATH =
        parentPath === null || parentPath.trim() === ''
            ? filename
            : `${parentPath}/${filename}`
    console.log(PATH, 'patttth')

    const { uploadFile } = useUploadFile()
    const { getDownloadUrl } = useGetDownloadUrl()
    const { onDrop, onDragOver, onDragEnter, onDragLeave, border } =
        useDroppableContainer(async (file: File) => {
            await uploadFile(file, PATH)
            onFileUpload()
        })
    const { setPosition, setPath, setType } = useContext(FileMenuContext)

    const files = addProxyDefaultValue(
        {
            pdf: <AiOutlineFilePdf size={FILE_SIZE} color={'red'} />,
            ppt: <AiOutlineFilePpt size={FILE_SIZE} color={'orange'} />,
        },
        <AiOutlineFile size={FILE_SIZE} />
    )

    const extension = extractFileExtension(filename)

    const downloadFile = async () => {
        if (type === 'folder') return
        const link = await getDownloadUrl(parentPath, filename)
        await download(link, filename)
    }

    const toggleSubfolder = () => {
        setSubfolderVisible(!subfolderVisible)
    }

    return (
        <Flex direction={'column'} w={'100%'}>
            <Flex
                className={'main-file'}
                flex={'60px'}
                onClick={() => toggleSubfolder()}
                cursor={type == 'folder' ? 'pointer' : undefined}
                maxH={'60px'}
                minH={'60px'}
                alignItems={'center'}
                onDrop={type === 'folder' ? onDrop : undefined}
                onDragEnter={type === 'folder' ? onDragEnter : undefined}
                onDragLeave={type === 'folder' ? onDragLeave : undefined}
                onDragOver={type === 'folder' ? onDragOver : undefined}
                border={type === 'folder' ? border : undefined}
            >
                <Flex
                    marginLeft={'20px'}
                    position={'relative'}
                    alignItems={'center'}
                    gap={5}
                    _after={parent ? FOLDER_GRAY_LINE : undefined}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        setPath(PATH)
                        setType(type)
                        setPosition({ x: e.pageX, y: e.pageY })
                    }}
                >
                    <>
                        {type === 'folder' ? (
                            <AiFillFolder size={FILE_SIZE} color={'#03b1fc'} />
                        ) : (
                            files[extension]
                        )}
                        <Text
                            onClick={downloadFile}
                            maxH={'20px'}
                            _hover={{ textDecoration: 'underline' }}
                            cursor={'pointer'}
                        >
                            {filename}
                        </Text>
                    </>
                </Flex>
            </Flex>
            {subfolderVisible && type == 'folder' && subfolders.length > 0 && (
                <Flex
                    marginLeft={'40px'}
                    direction={'column'}
                    flex={1}
                    borderLeft={'1px solid lightgray'}
                >
                    {subfolders.map((child: FileTreeNode) => (
                        <FileBranch
                            key={child.filename}
                            filename={child.filename}
                            type={child.type}
                            subfolders={child.subfolders}
                            parent={filename}
                            parentPath={`${PATH}`}
                            onFileUpload={() => onFileUpload()}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    )
}
