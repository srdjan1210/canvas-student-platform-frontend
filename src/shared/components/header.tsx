import { Flex, Text } from '@chakra-ui/react'
import { useApplicationStore } from '../../store/application.store'

export const Header = () => {
    const user = useApplicationStore((state) => state.user)
    return (
        <Flex
            background={'black'}
            h={'50px'}
            w={'100%'}
            justifyContent={'center'}
        >
            <Flex w={'90%'} alignItems={'center'} justifyContent={'flex-end'}>
                <Text color={'white'}>{user?.name + ' ' + user?.surname}</Text>
            </Flex>
        </Flex>
    )
}
