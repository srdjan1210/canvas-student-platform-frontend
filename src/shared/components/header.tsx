import { Box, Flex, Select, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AlertAnnouncementView } from '../../announcements/components/alert-announcement-view.component'
import { Announcement } from '../../announcements/model/announcement.model'
import { useGetPersonalAnnouncements } from '../../api/courses/announcements/useGetStudentAnnouncements'
import { useSocketConnection } from '../../api/sockets/useSocketConnection'
import { useApplicationStore } from '../../store/application.store'
import { useInfiniteScroll } from '../utils/useInfiniteScroll'
import { toast } from 'react-toastify'

export const Header = () => {
    const user = useApplicationStore((state) => state.user)
    const notifications = useApplicationStore((state) => state.notifications)
    const addAnnouncement = useApplicationStore(
        (state) => state.addNotification
    )
    const addAnnouncements = useApplicationStore(
        (state) => state.addNotifications
    )
    const [showAnnouncements, setShowAnnouncements] = useState(false)
    const [showNotificationMark, setShowNotificationMark] = useState(false)
    const { getPersonalAnnouncements, announcementsState } =
        useGetPersonalAnnouncements()
    const { observable } = useSocketConnection()
    const { onScroll, page } = useInfiniteScroll(
        async () => {
            const newAnnouncements = await getPersonalAnnouncements(page)
            addAnnouncements(newAnnouncements)
            return newAnnouncements.length != 0
        },
        {
            isLoading: announcementsState.status === 'LOADING',
            triggerAtMounted: true,
        }
    )

    useEffect(() => {
        const notId = observable.bind('notification', (ann: Announcement) => {
            addAnnouncement(ann)
            setShowNotificationMark(true)
            toast.info('New notification', {
                position: 'bottom-right',
            })
        })

        return () => observable.unbind(notId)
    }, [])

    useEffect(() => {
        if (showAnnouncements) {
            setShowNotificationMark(false)
        }
    }, [showAnnouncements])

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
                <Box
                    css={
                        showNotificationMark
                            ? {
                                  position: 'relative',
                                  '&::before': {
                                      background: 'red',
                                      width: '10px',
                                      height: '10px',
                                      borderRadius: '50%',
                                      position: 'absolute',
                                      top: '0',
                                      right: '0',
                                      content: '""',
                                  },
                              }
                            : undefined
                    }
                >
                    <IoMdNotificationsOutline
                        size={20}
                        color={'white'}
                        cursor={'pointer'}
                        onClick={() => setShowAnnouncements(!showAnnouncements)}
                    />
                </Box>

                {showAnnouncements && (
                    <AlertAnnouncementView
                        triggerSpinner={announcementsState.status === 'LOADING'}
                        announcements={notifications}
                        onScroll={onScroll}
                    />
                )}
            </Flex>
        </Flex>
    )
}
