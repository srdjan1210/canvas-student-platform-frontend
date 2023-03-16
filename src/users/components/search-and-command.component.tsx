import { Button, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { Children } from '../../shared/types'

export interface Props {
    placeholder?: string
    onChange: (text: string) => void
    children: Children
    showCommands: boolean
}
export const SearchAndCommand = ({
    placeholder,
    onChange,
    children,
    showCommands,
}: Props) => {
    const [text, setText] = useState('')
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            onChange(text)
        }
    }

    return (
        <Flex
            h={100}
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Input
                placeholder={placeholder}
                w={500}
                size={'lg'}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                value={text}
            />

            {showCommands && children}
        </Flex>
    )
}
