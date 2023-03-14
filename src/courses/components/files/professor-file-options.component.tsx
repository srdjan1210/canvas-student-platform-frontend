import { Box, Button, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import FileUpload from './file-upload.component'
import { useEffect, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { InputButton } from '../input-button.component'

interface Props {
    onCreateFolder: (folder: string) => void
    onUploadFile: (file: File | null) => void
}
type FormValues = {
    file: File
}
export const ProfessorFileOptions = ({
    onCreateFolder,
    onUploadFile,
}: Props) => {
    const [file, setFile] = useState<File | null>(null)
    const [folder, setFolder] = useState('')
    const { register, watch } = useForm<FormValues>()
    const files = watch('file')

    useEffect(() => {
        if (files) {
            setFile(Object.values(files)[0])
        }
    }, [files])

    const uploadFile = () => {
        onUploadFile(file)
        setFile(null)
    }

    const createFolder = () => {
        onCreateFolder(folder)
        setFolder('')
    }

    return (
        <Flex gap={5} alignItems={'center'}>
            <InputButton
                val={folder}
                onChange={(val) => setFolder(val)}
                onClick={createFolder}
            />
            {file && (
                <>
                    <Box>
                        <Button
                            leftIcon={<AiOutlineUpload size={25} />}
                            onClick={uploadFile}
                            background={'green'}
                            color={'white'}
                        >
                            Upload file
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            leftIcon={<BsFillTrashFill size={20} />}
                            background={'green'}
                            color={'white'}
                            onClick={() => setFile(null)}
                        >
                            Remove file
                        </Button>
                    </Box>
                </>
            )}
            {!file && (
                <Box>
                    <FileUpload register={register('file')}>
                        <Button
                            leftIcon={<IoMdAdd size={25} />}
                            background={'green'}
                            color={'white'}
                        >
                            Add file
                        </Button>
                    </FileUpload>
                </Box>
            )}
            {file?.name}
        </Flex>
    )
}
