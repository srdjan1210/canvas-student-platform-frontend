import { Flex, Text } from '@chakra-ui/react'
import { VscEmptyWindow } from 'react-icons/vsc'

export const NoFiles = () => {
    return (
        <Flex
            w={'100%'}
            h={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            direction={'column'}
        >
            <VscEmptyWindow size={300} color={'black'} />
            <Text fontSize={25} fontWeight={'bold'}>
                No files in this course!
            </Text>
        </Flex>
    )
}
