import {
    Box,
    Button,
    Text,
    Flex,
    Menu,
    MenuButton,
    MenuList,
} from '@chakra-ui/react'
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useDeleteFile } from '../../../api/courses/files/useDeleteFile'
import { InputButton } from '../../../courses/components/input-button.component'
import { useCreateFolder } from '../../../api/courses/files/useCreateFolder'
import { useDeleteFolder } from '../../../api/courses/files/useDeleteFolder'
import { IoMdAdd } from 'react-icons/io'
import { BsFillTrashFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

export interface IFileMenuContext {
    setPosition: (position: { x: number; y: number } | null) => void
    setPath: (path: string) => void
    setType: (type: string) => void
}
export const FileMenuContext = createContext<IFileMenuContext>({
    setPath: () => {},
    setPosition: () => {},
    setType: () => {},
})

export interface Props {
    onFileDeleted: () => void
}

export const FileMenuContextWrapper = ({
    children,
    onFileDeleted,
}: React.PropsWithChildren & Props) => {
    const { createFolder } = useCreateFolder()
    const [position, setPosition] = useState<{ x: number; y: number } | null>(
        null
    )
    const { title } = useParams()
    const [path, setPath] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [folder, setFolder] = useState<string>('')
    const { deleteFile } = useDeleteFile()
    const { deleteFolder } = useDeleteFolder()
    const ref = useRef(null)

    const handleDeleteFile = async () => {
        if (path === title) {
            setPosition(null)
            return
        }
        if (type === 'folder') {
            await deleteFolder(path)
        } else {
            await deleteFile(path)
        }
        setPath('')
        setType('')
        setPosition(null)
        onFileDeleted()
    }

    const handleCreateFolder = async () => {
        await createFolder(`${path}/${folder}`)
        setFolder('')
        setPosition(null)
        onFileDeleted()
    }

    useEffect(() => {
        const resetAll = () => {
            console.log(document.activeElement, ref.current)
            if (document.activeElement === ref.current) return
            setPosition(null)
            setPath('')
            setType('')
        }
        window.addEventListener('click', resetAll)

        return () => {
            window.removeEventListener('click', resetAll)
        }
    }, [])

    return (
        <FileMenuContext.Provider value={{ setPosition, setType, setPath }}>
            {children}
            {position && (
                <Flex
                    direction={'column'}
                    position={'fixed'}
                    top={position?.y}
                    left={position?.x}
                    zIndex={'100000000'}
                    background={'white'}
                    borderRadius={3}
                    padding={'5px 2px'}
                    minW={'150px'}
                    border={'1px solid lightgray'}
                >
                    <Flex
                        h={'50px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        cursor={'pointer'}
                        w={'100%'}
                        _hover={{ background: 'lightgray' }}
                    >
                        <Text
                            color={'red'}
                            fontWeight={'bold'}
                            onClick={() => handleDeleteFile()}
                            w={'100%'}
                            textAlign={'center'}
                        >
                            Delete
                        </Text>
                    </Flex>
                    {type === 'folder' && (
                        <Box>
                            <InputButton
                                forwardedRef={ref}
                                val={folder}
                                onChange={(val) => setFolder(val)}
                                onClick={() => handleCreateFolder()}
                                autoFocus={true}
                            />
                        </Box>
                    )}
                </Flex>
            )}
        </FileMenuContext.Provider>
    )
}
