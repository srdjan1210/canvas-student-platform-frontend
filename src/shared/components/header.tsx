import { Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AlertAnnouncementView } from '../../announcements/components/alert-announcement-view.component'
import { Announcement } from '../../announcements/model/announcement.model'
import { useGetPersonalAnnouncements } from '../../api/courses/announcements/useGetStudentAnnouncements'
import { useApplicationStore } from '../../store/application.store'
import { useInfiniteScroll } from '../utils/useInfiniteScroll'

export const Header = () => {
    const user = useApplicationStore((state) => state.user)
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [showAnnouncements, setShowAnnouncements] = useState(false)
    const { getPersonalAnnouncements, announcementsState } =
        useGetPersonalAnnouncements()

    const { onScroll, page } = useInfiniteScroll(
        async () => {
            const newAnnouncements = await getPersonalAnnouncements(page)
            setAnnouncements([...announcements, ...newAnnouncements])
            return newAnnouncements.length != 0
        },
        {
            isLoading: announcementsState.status === 'LOADING',
            triggerAtMounted: true,
        }
    )

    return (
        <Flex
            background={'black'}
            h={'50px'}
            w={'100%'}
            minH={'50px'}
            justifyContent={'center'}
        >
            <Flex
                w={'90%'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                gap={5}
            >
                <Text color={'white'}>{user?.name + ' ' + user?.surname}</Text>
                <IoMdNotificationsOutline
                    size={20}
                    color={'white'}
                    cursor={'pointer'}
                    onClick={() => setShowAnnouncements(!showAnnouncements)}
                />
                {showAnnouncements && (
                    <AlertAnnouncementView
                        triggerSpinner={announcementsState.status === 'LOADING'}
                        announcements={announcements}
                        onScroll={onScroll}
                    />
                )}
            </Flex>
        </Flex>
    )
}
