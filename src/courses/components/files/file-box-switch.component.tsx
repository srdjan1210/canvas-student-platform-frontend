import { Box, Flex } from '@chakra-ui/react'
import { BsFillGridFill } from 'react-icons/bs'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { useApplicationStore } from '../../../store/application.store'

export type FileBoxType = 'grid' | 'list'

export const FileBoxSwitch = () => {
    const setBoxSwitch = useApplicationStore((state) => state.setBoxType)
    const type = useApplicationStore((state) => state.boxType)
    return (
        <Flex gap={5}>
            <Box cursor={'pointer'} w={30} h={30}>
                <BsFillGridFill
                    size={30}
                    onClick={() => setBoxSwitch('grid')}
                    color={type === 'grid' ? 'black' : 'gray'}
                />
            </Box>
            <Box cursor={'pointer'} w={30} h={30}>
                <AiOutlineUnorderedList
                    size={30}
                    onClick={() => setBoxSwitch('list')}
                    color={type === 'list' ? 'black' : 'gray'}
                />
            </Box>
        </Flex>
    )
}
