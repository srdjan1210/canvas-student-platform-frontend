import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Announcement } from '../model/announcement.model'
import { formatDatePretty } from '../../shared/utils/utils'
import { useNavigate } from 'react-router-dom'

export interface Props {
    announcement: Announcement
}
export const AlertAnnouncementItem = ({ announcement }: Props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/dashboard/announcements/${announcement.id}`)
    }
    return (
        <Flex
            padding={'5px'}
            borderBottom={'1px solid lightgray'}
            maxH={'80px'}
            h={'80px'}
            alignItems={'center'}
            cursor={'pointer'}
            onClick={handleClick}
        >
            <Flex alignItems={'center'} justifyContent={'center'} padding={2}>
                <Image
                    maxH={10}
                    maxW={10}
                    src={announcement.avatar}
                    w={10}
                    h={10}
                    borderRadius={'50%'}
                />
            </Flex>

            <Box>
                <Flex direction={'column'}>
                    <small style={{ fontSize: '10px', color: 'gray' }}>
                        {formatDatePretty(announcement.createdAt)}
                    </small>
                    <small style={{ color: 'gray' }}>
                        {announcement.professorName +
                            ' ' +
                            announcement.professorSurname}
                    </small>
                </Flex>
                <Text
                    css={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        height: '1.2em',
                        maxWidth: '200px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {announcement.title}
                </Text>
            </Box>
        </Flex>
    )
}
