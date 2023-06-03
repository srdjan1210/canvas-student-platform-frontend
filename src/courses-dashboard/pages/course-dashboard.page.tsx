import { Flex } from '@chakra-ui/react'
import { DashboardNavigationCard } from '../components/dashboard-navigation-card.component'
import { Outlet, useNavigate } from 'react-router-dom'
import React from 'react'
import { useApplicationStore } from '../../store/application.store'

export const CourseDashboardPage = () => {
    const user = useApplicationStore((state) => state.user)
    const navigate = useNavigate()
    return (
        <Flex
            padding={10}
            w={'100%'}
            h={'100%'}
            direction={'column'}
            gap={5}
            className={'course-outer-wrapper'}
        >
            <Flex
                className={'navigation'}
                h={'100px'}
                justifyContent={'space-between'}
                gap={10}
            >
                <DashboardNavigationCard
                    onClick={() => navigate('files')}
                    text={'Files'}
                    borderBottom={'2px solid green'}
                    flex={1}
                    h={'80px'}
                />
                <DashboardNavigationCard
                    onClick={() => navigate('announcements')}
                    text={'Announcements'}
                    borderBottom={'2px solid orange'}
                    flex={1}
                    h={'80px'}
                />
                {user?.role === 'ADMINISTRATOR' && (
                    <>
                        <DashboardNavigationCard
                            onClick={() => navigate('students')}
                            text={'Students'}
                            borderBottom={'2px solid red'}
                            flex={1}
                            h={'80px'}
                        />
                        <DashboardNavigationCard
                            onClick={() => navigate('professors')}
                            text={'Professors'}
                            borderBottom={'2px solid blue'}
                            flex={1}
                            h={'80px'}
                        />
                    </>
                )}
                {user?.role === 'PROFESSOR' && (
                    <DashboardNavigationCard
                        onClick={() => navigate('tests')}
                        text={'Tests'}
                        borderBottom={'2px solid blue'}
                        flex={1}
                        h={'80px'}
                    />
                )}
                {user?.role === 'STUDENT' && (
                    <DashboardNavigationCard
                        onClick={() => navigate('my-scores')}
                        text={'My Scores'}
                        borderBottom={'2px solid blue'}
                        flex={1}
                        h={'80px'}
                    />
                )}
            </Flex>
            <Flex
                flex={1}
                position={'relative'}
                justifyContent={'center'}
                className={'course-inner-wrapper'}
                direction={'column'}
                w={'100%'}
                maxH={'calc(100% - 150px)'}
                minH={'calc(100% - 150px)'}
                padding={'5px'}
            >
                <Outlet />
            </Flex>
        </Flex>
    )
}
