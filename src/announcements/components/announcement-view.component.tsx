import { Flex, Text } from '@chakra-ui/react'
import { Announcement } from '../model/announcement.model'

interface Props {
    announcement: Announcement
}
export const AnnouncementView = ({
    announcement: { body, professorSurname, professorName, title },
}: Props) => {
    return (
        <Flex
            direction={'column'}
            borderTop={'1px solid lightgray'}
            borderBottom={'1px solid lightgray'}
            padding={'10px'}
        >
            <Text
                fontSize={'1.2em'}
                color={'green'}
                fontWeight={'bold'}
            >{`@${professorName} ${professorSurname}`}</Text>
            <Text fontWeight={'bold'} fontSize={'1.4em'}>
                {title}
            </Text>
            <Text fontSize={'1.2em'}>{body}</Text>
        </Flex>
    )
}

export default AnnouncementView
