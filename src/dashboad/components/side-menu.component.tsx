import { Flex, Spacer } from '@chakra-ui/react'
import { SideMenuItem } from './side-menu-item.component'
import { FiLogOut } from 'react-icons/fi'
import { IoMdCreate } from 'react-icons/io'
import { MdOutlineAccountCircle, MdOutlinePlayLesson } from 'react-icons/md'
import { SideMenuProfileItem } from './side-menu-profile-item'
import { useApplicationStore } from '../../store/application.store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SideMenu = () => {
    const navigate = useNavigate()
    const user = useApplicationStore((state) => state.user)
    const logout = useApplicationStore((state) => state.logout)
    const onLogout = () => {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <Flex
            w={'100px'}
            h={'100%'}
            background={'black'}
            direction={'column'}
            alignItems={'center'}
            padding={'30px 0'}
            gap={10}
        >
            {user?.role === 'ADMINISTRATOR' && (
                <SideMenuItem
                    tooltip={'Create profile'}
                    link={'/dashboard/registration'}
                    icon={
                        <IoMdCreate color="white" size={40} cursor="pointer" />
                    }
                />
            )}

            {user?.role === 'STUDENT' && (
                <SideMenuItem
                    tooltip={'Courses'}
                    link={'/dashboard/student'}
                    icon={
                        <MdOutlinePlayLesson
                            color="white"
                            size={40}
                            cursor="pointer"
                        />
                    }
                />
            )}
            {user?.role === 'PROFESSOR' && (
                <SideMenuItem
                    tooltip={'Courses'}
                    link={'/dashboard/professor'}
                    icon={
                        <MdOutlinePlayLesson
                            color="white"
                            size={40}
                            cursor="pointer"
                        />
                    }
                />
            )}
            {user?.role === 'ADMINISTRATOR' && (
                <SideMenuItem
                    tooltip={'Students'}
                    link={'/dashboard/students'}
                    icon={
                        <MdOutlineAccountCircle
                            color="white"
                            size={40}
                            cursor="pointer"
                        />
                    }
                />
            )}
            <Spacer />
            <SideMenuProfileItem letter={user?.name?.charAt(0).toUpperCase()} />
            <SideMenuItem
                action={onLogout}
                tooltip={'logout'}
                icon={<FiLogOut color={'white'} size={40} cursor={'pointer'} />}
            />
        </Flex>
    )
}
export default SideMenu
