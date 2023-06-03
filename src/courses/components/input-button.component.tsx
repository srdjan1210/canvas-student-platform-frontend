import {
    Box,
    Button,
    IconButton,
    Input,
    InputElementProps,
    InputGroup,
    InputProps,
    InputRightElement,
} from '@chakra-ui/react'
import { AiFillFolderAdd } from 'react-icons/ai'

interface Props {
    val: string
    onChange: (val: string) => void
    onClick: () => void
    autoFocus?: boolean
    forwardedRef?: React.MutableRefObject<null>
}

export const InputButton = ({
    val,
    onClick,
    onChange,
    autoFocus = false,
    forwardedRef,
}: Props) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            onClick()
        }
    }
    return (
        <InputGroup size="md">
            <Input
                autoFocus={autoFocus}
                w={'15rem'}
                placeholder="Create folder"
                value={val}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={forwardedRef}
            />
            <InputRightElement>
                <IconButton
                    background={'green'}
                    color={'white'}
                    aria-label={'folder'}
                    icon={<AiFillFolderAdd size={25} />}
                    onClick={onClick}
                />
            </InputRightElement>
        </InputGroup>
    )
}
