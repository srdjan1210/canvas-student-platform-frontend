import { Flex, Image } from '@chakra-ui/react'
import { useApplicationStore } from '../../store/application.store'

export const SideMenuProfileItem = () => {
    const user = useApplicationStore((state) => state.user)

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
            {user?.avatar ? <Image src={user?.avatar} /> : user?.name.charAt(0)}
        </Flex>
    )
}
