import { Flex, Spinner } from '@chakra-ui/react'
import { FileBranch } from '../../components/files/file-branch.component'
import { SCROLL_HOVER_DEFAULT } from '../../../shared/utils/utils'
import { useParams } from 'react-router-dom'
import { FileTreeNode } from '../../../api/courses/types/file-tree-node'
import React, { useEffect, useState } from 'react'
import { useGetFileTree } from '../../../api/courses/files/useGetFileTree'
import { FileMenuContextWrapper } from '../../components/files/file-menu-context.component'
import { useDroppableContainer } from '../../hooks/useDroppableContainer'
import { useUploadFile } from '../../../api/courses/files/useUploadFile'
import { InputButton } from '../../../courses/components/input-button.component'

export const FileTreePage = () => {
    const { title } = useParams()
    const [files, setFiles] = useState<FileTreeNode[]>([])
    const { getFileTree, fileTreeState } = useGetFileTree()
    const loadFileTree = async () => {
        const files = await getFileTree(title ?? '')
        console.log(files)
        setFiles(files)
    }

    useEffect(() => {
        loadFileTree()
    }, [])

    return (
        <Flex
            w={'100%'}
            maxH={'100%'}
            flexGrow={1}
            flexShrink={0}
            direction={'column'}
            css={{ ...SCROLL_HOVER_DEFAULT }}
            position={'relative'}
            boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}
            onContextMenu={(e) => {
                e.preventDefault()
            }}
            overflow={'overlay'}
        >
            <FileMenuContextWrapper onFileDeleted={() => loadFileTree()}>
                <FileBranch
                    filename={title ?? ''}
                    type={'folder'}
                    subfolders={files}
                    parentPath={''}
                    onFileUpload={() => loadFileTree()}
                    isOpen={true}
                />
            </FileMenuContextWrapper>
            {fileTreeState.status === 'LOADING' && (
                <Flex
                    position={'absolute'}
                    w={'100%'}
                    h={'100%'}
                    background={'rgba(0, 0, 0, 0.2)'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    top={'0'}
                    left={'0'}
                >
                    <Spinner size={'xl'} />
                </Flex>
            )}
        </Flex>
    )
}
