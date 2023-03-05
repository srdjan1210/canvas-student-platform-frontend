import { Flex, Tooltip } from '@chakra-ui/react'

export const SideMenu = () => {
    return (
        <Flex w={'150px'} h={'100%'}>
            <Tooltip label={'works'}>
                <Flex w={'50px'} h={'50px'}>
                    Works
                </Flex>
            </Tooltip>
        </Flex>
    )
}

export default SideMenu
