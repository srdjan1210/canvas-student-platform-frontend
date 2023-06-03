import { Announcement } from '../../../announcements/model/announcement.model'
import { Flex, Text, Heading } from '@chakra-ui/react'
import { formatDatePretty } from '../../../shared/utils/utils'
import DOMPurify from 'dompurify'

export interface Props {
    announcement: Announcement
}
export const CourseAnnouncementCard = ({ announcement }: Props) => {
    const createMarkup = (html: string) => {
        return {
            __html: DOMPurify.sanitize(html),
        }
    }
    return (
        <Flex
            padding={5}
            direction={'column'}
            boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}
            gap={10}
            w={'100%'}
        >
            <Flex className={'header'} gap={10}>
                <Flex
                    h={'50px'}
                    w={'50px'}
                    borderRadius={'50%'}
                    overflow={'hidden'}
                >
                    <img
                        src={announcement.avatar}
                        style={{ width: '100%', height: '100%' }}
                        alt=""
                    />
                </Flex>
                <Flex direction={'column'}>
                    <small style={{ color: 'lightgray' }}>
                        {formatDatePretty(announcement.createdAt)}
                    </small>
                    <Heading
                        as={'h2'}
                        fontSize={'20px'}
                    >{`${announcement.professorName} ${announcement.professorSurname}`}</Heading>
                </Flex>
            </Flex>
            <Flex fontSize={'25px'} textAlign={'center'} alignSelf={'center'}>
                {announcement.title}
            </Flex>
            <Flex className={'body'}>
                <Text
                    aria-multiline={true}
                    fontSize={'25px'}
                    dangerouslySetInnerHTML={createMarkup(announcement.body)}
                />
            </Flex>
        </Flex>
    )
}
