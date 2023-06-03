import { Outlet } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import SideMenu from '../components/side-menu.component'
import { useApplicationStore } from '../../store/application.store'
import { Header } from '../../shared/components/header'

export const Dashboard = () => {
    return (
        <Flex w={'100vw'} h={'100vh'}>
            <SideMenu />
            <Flex direction={'column'} w={'100%'} h={'100%'}>
                <Header />
                <Outlet />
            </Flex>
        </Flex>
    )
}
