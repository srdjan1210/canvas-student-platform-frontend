import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Announcement } from '../../../announcements/model/announcement.model'
import React, { useEffect, useState } from 'react'
import { useGetCourseAnnouncements } from '../../../api/announcements/useGetCourseAnnouncements'
import { useParams } from 'react-router-dom'
import { CourseAnnouncementCard } from '../../components/announcements/course-announcement-card.component'
import { SCROLL_HOVER_DEFAULT } from '../../../shared/utils/utils'

export const CourseAnnouncementsPage = () => {
    const { title } = useParams()
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const { getCourseAnnouncements, courseAnnouncementsState } =
        useGetCourseAnnouncements()

    const loadAnnouncements = async () => {
        const announcements = await getCourseAnnouncements(title ?? '')
        setAnnouncements(announcements)
    }

    useEffect(() => {
        loadAnnouncements()
    }, [])

    return (
        <Flex
            position={'relative'}
            direction={'column'}
            w={'100%'}
            h={'100%'}
            gap={4}
            padding={'10px'}
            overflowY={'scroll'}
            css={{ ...SCROLL_HOVER_DEFAULT }}
        >
            {announcements.map((ann) => (
                <CourseAnnouncementCard announcement={ann} key={ann.id} />
            ))}
            {courseAnnouncementsState.status === 'LOADING' && (
                <Flex
                    position={'absolute'}
                    w={'100%'}
                    h={'100%'}
                    background={'rgba(0, 0, 0, 0.2)'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    top={'0'}
                    left={'0'}
                >
                    <Spinner size={'xl'} />
                </Flex>
            )}
        </Flex>
    )
}
