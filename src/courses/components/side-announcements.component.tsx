import { Box, Flex, Heading } from '@chakra-ui/react'
import { AnnouncementView } from '../../announcements/components/announcement-view.component'
import { Announcement } from '../../announcements/model/announcement.model'

interface Props {
    announcements: Announcement[]
}

export const SideAnnouncements = ({ announcements }: Props) => {
    return (
        <Flex
            alignSelf={'flex-end'}
            flex={2}
            maxW={'500px'}
            minW={'400px'}
            height={'100%'}
            border={'1px solid lightgray'}
            direction={'column'}
            padding={'10px 0 0 0'}
            overflow={'hidden'}
            boxShadow={'lg'}
        >
            <Heading
                as={'h2'}
                boxShadow={'md'}
                padding={'10px 0'}
                textAlign={'center'}
            >
                Announcements
            </Heading>
            <Flex
                className={'announcements'}
                direction={'column'}
                overflowY={'scroll'}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'lightgray',
                        borderRadius: '24px',
                    },
                    '&:hover::-webkit-scrollbar': {
                        width: '8px',
                    },
                }}
            >
                {announcements.map((ann) => (
                    <AnnouncementView key={ann.id} announcement={ann} />
                ))}
            </Flex>
        </Flex>
    )
}
