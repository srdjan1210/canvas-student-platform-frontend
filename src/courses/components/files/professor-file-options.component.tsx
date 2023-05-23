import { Box, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { InputButton } from '../input-button.component'

interface Props {
    onCreateFolder: (folder: string) => void
    onUploadFile: (file: File | null) => void
    onCreateAnnouncement: () => void
}
type FormValues = {
    file: File
}
export const ProfessorFileOptions = ({
    onCreateFolder,
    onUploadFile,
    onCreateAnnouncement,
}: Props) => {
    const [folder, setFolder] = useState('')

    const handleFileUpload = (e: any) => {
        if (e.target.files == null || e.target.files?.length == 0) return
        const file = e.target.files[0]
        onUploadFile(file)
        e.target.value = null
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
            <Box>
                <Button
                    leftIcon={<IoMdAdd size={25} />}
                    background={'green'}
                    color={'white'}
                    onClick={() => onCreateAnnouncement()}
                >
                    Create Announcement
                </Button>
            </Box>
            <Box>
                <input
                    id="file-upload"
                    type={'file'}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />

                <Button
                    leftIcon={<IoMdAdd size={25} />}
                    background={'green'}
                    color={'white'}
                >
                    <label style={{ cursor: 'pointer' }} htmlFor="file-upload">
                        Add file
                    </label>
                </Button>
            </Box>
        </Flex>
    )
}
