import { Box, Button, Flex } from '@chakra-ui/react'
import { IoMdAdd } from 'react-icons/io'

export interface Props {
    id: string
    onUploadFile: (file: File) => void
    disabled: boolean
}

export const UploadFileButton = ({
    id,
    onUploadFile,
    disabled = false,
}: Props) => {
    console.log(disabled)
    const handleFileUpload = (e: any) => {
        if (e.target.files == null || e.target.files?.length == 0) return
        const file = e.target.files[0]
        onUploadFile(file)
        e.target.value = null
    }

    return (
        <Flex h={'100%'} w={'100%'} margin={'auto'} justifyContent={'center'}>
            <input
                id={id}
                type={'file'}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />

            <Button
                h={'35px'}
                w={'130px'}
                leftIcon={<IoMdAdd size={20} />}
                background={'green'}
                color={'white'}
                isDisabled={disabled}
                _disabled={{ background: 'gray' }}
                cursor={disabled ? { cursor: 'none' } : undefined}
                _hover={disabled ? { background: 'gray' } : undefined}
            >
                {disabled ? (
                    'Upload File'
                ) : (
                    <label style={{ cursor: 'pointer' }} htmlFor={id}>
                        Upload file
                    </label>
                )}
            </Button>
        </Flex>
    )
}
