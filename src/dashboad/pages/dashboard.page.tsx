import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import SideMenu from '../components/side-menu.component'

export const Dashboard = () => {
    return (
        <Flex w={'100%'} h={'100%'}>
            <SideMenu />
            <Outlet />
        </Flex>
    )
}
