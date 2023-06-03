import { Box, Button, Flex } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io'
import { PropsWithChildren } from 'react'

export interface Props {
    id: string
    onUploadFile: (file: File) => void
    disabled: boolean
}

export const UploadFileButtonNoStyle = ({
    id,
    onUploadFile,
    disabled = false,
    children,
}: Props & PropsWithChildren) => {
    const handleFileUpload = (e: any) => {
        if (e.target.files == null || e.target.files?.length == 0) return
        const file = e.target.files[0]
        onUploadFile(file)
        e.target.value = null
    }

    return (
        <Box>
            <input
                id={id}
                type={'file'}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />

            <Button
                leftIcon={<IoMdAdd size={20} />}
                background={'green'}
                color={'white'}
                isDisabled={disabled}
                _disabled={{ background: 'gray' }}
                cursor={disabled ? { cursor: 'none' } : undefined}
                _hover={disabled ? { background: 'gray' } : undefined}
            >
                <label style={{ cursor: 'pointer' }} htmlFor={id}>
                    {children}
                </label>
            </Button>
        </Box>
    )
}
