import { Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import {
    MdOutlineAccountCircle,
    MdOutlineCreate,
    MdOutlinePlayLesson,
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { CreateCourseForm } from '../../courses/components/create-course-form.component'
import { useApplicationStore } from '../../store/application.store'
import { SideMenuItem } from './side-menu-item.component'
import { SideMenuProfileItem } from './side-menu-profile-item'

export const SideMenu = () => {
    const navigate = useNavigate()
    const user = useApplicationStore((state) => state.user)
    const logout = useApplicationStore((state) => state.logout)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const onLogout = () => {
        logout()
        navigate('/login')
    }

    const openCreateCourseForm = () => {
        onOpen()
    }

    return (
        <Flex
            w={'100px'}
            h={'100%'}
            minW={'100px'}
            background={'black'}
            direction={'column'}
            alignItems={'center'}
            padding={'30px 0'}
            gap={10}
        >
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
                    tooltip={'Courses'}
                    link={'/dashboard/administrator'}
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
            {user?.role === 'ADMINISTRATOR' && (
                <SideMenuItem
                    tooltip={'Professors'}
                    link={'/dashboard/professors'}
                    icon={
                        <MdOutlineAccountCircle
                            color="white"
                            size={40}
                            cursor="pointer"
                        />
                    }
                />
            )}
            {user?.role === 'ADMINISTRATOR' && (
                <SideMenuItem
                    tooltip={'Create course'}
                    icon={
                        <MdOutlineCreate
                            color="white"
                            size={40}
                            cursor="pointer"
                            onClick={() => openCreateCourseForm()}
                        />
                    }
                />
            )}
            <Spacer />
            <SideMenuProfileItem />
            <SideMenuItem
                action={onLogout}
                tooltip={'logout'}
                icon={<FiLogOut color={'white'} size={40} cursor={'pointer'} />}
            />
            <CreateCourseForm isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}
export default SideMenu
