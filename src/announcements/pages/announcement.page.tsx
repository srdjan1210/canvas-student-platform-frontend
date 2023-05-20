import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Announcement } from '../model/announcement.model'
import { Box, Flex, Text } from '@chakra-ui/react'
import '../css/animations.css'
import DOMPurify from 'dompurify'
import { useGetAnnouncement } from '../../api/announcements/useGetAnnouncement'

export const AnnouncementPage = () => {
    const { announcementId, title } = useParams()
    const { getAnnouncement } = useGetAnnouncement()
    const [announcement, setAnnouncement] = useState<Announcement | null>(null)
    const loadAnnouncement = async () => {
        const announcement = await getAnnouncement(
            title ?? '',
            parseInt(announcementId ?? '0')
        )
        setAnnouncement(announcement)
    }
    const createMarkup = (html: string) => {
        return {
            __html: DOMPurify.sanitize(html),
        }
    }

    function formatDate(date?: Date): string {
        console.log(date)
        if (!date) return ''
        date = new Date(date)
        const year = date.getFullYear()
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate().toString().padStart(2, '0')
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${day}-${month}-${year} ${hours}:${minutes}`
    }

    useEffect(() => {
        loadAnnouncement()
    }, [])

    return (
        <Flex
            w={'100%'}
            h={'100%'}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Flex w={'60%'} h={'80%'} direction={'column'}>
                <Flex
                    w={'100%'}
                    borderBottom={'1px solid lightgray'}
                    className={'header'}
                    gap={5}
                    direction={'column'}
                    justifyContent={'center'}
                >
                    <Flex gap={2} alignItems={'center'}>
                        {announcement?.avatar && (
                            <Box
                                borderRadius={'50%'}
                                maxH={'50px'}
                                w={'50px'}
                                h={'50px'}
                                overflow={'hidden'}
                            >
                                <img
                                    src={announcement?.avatar}
                                    alt={'img'}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Box>
                        )}
                        <Flex direction={'column'}>
                            <Text fontSize={'1.6rem'}>
                                @
                                {`${announcement?.professorName} ${announcement?.professorSurname}`}
                            </Text>
                            <small style={{ color: 'gray' }}>
                                {formatDate(announcement?.createdAt)}
                            </small>
                        </Flex>
                    </Flex>

                    <Text fontSize={'1.5rem'}>{announcement?.title}</Text>
                </Flex>
                <Flex h={'100%'} w={'100%'} className={'typing-animation'}>
                    <div
                        className="preview"
                        dangerouslySetInnerHTML={createMarkup(
                            announcement?.body ?? ''
                        )}
                    ></div>
                </Flex>
            </Flex>
        </Flex>
    )
}
