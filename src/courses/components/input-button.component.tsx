import {
    Box,
    Button,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { AiFillFolderAdd } from 'react-icons/ai'

interface Props {
    val: string
    onChange: (val: string) => void
    onClick: () => void
}

export const InputButton = ({ val, onClick, onChange }: Props) => {
    return (
        <InputGroup size="md">
            <Input
                w={'15rem'}
                placeholder="Enter folder name"
                value={val}
                onChange={(e) => onChange(e.target.value)}
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
