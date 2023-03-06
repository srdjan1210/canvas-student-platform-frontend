import { Flex } from '@chakra-ui/react'

interface Props {
    letter?: string
}

export const SideMenuProfileItem = ({ letter }: Props) => {
    return (
        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={50}
            h={50}
            borderRadius={'50%'}
            background={'green'}
            color={'white'}
            fontSize={30}
        >
            {letter}
        </Flex>
    )
}
