import { Button, Flex, Input } from '@chakra-ui/react'
import { useRef, useState } from 'react'

export interface Props {
    text: string
    onUpload: (file: File | undefined) => void
}
export const UploadFileButton = ({ text, onUpload }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        if (!fileInputRef.current) return
        fileInputRef.current.click()
    }

    const handleFileChanged = (event: any) => {
        const selectedFile = event.target.files?.[0]
        onUpload(selectedFile)
        event.target.value = null
    }

    return (
        <div>
            <Button onClick={handleClick} color={'white'} background={'green'}>
                {text}
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChanged}
            />
        </div>
    )
}
