import { Flex, FlexProps, Spinner } from '@chakra-ui/react'
import { Announcement } from '../model/announcement.model'
import { AlertAnnouncementItem } from './alert-announcement-item.component'

interface Props {
    announcements: Announcement[]
    triggerSpinner: boolean
    onScroll: (e: any) => void
}
export const AlertAnnouncementView = ({
    announcements,
    triggerSpinner,
    onScroll,
    ...props
}: Props & FlexProps) => {
    return (
        <Flex
            position={'absolute'}
            top={10}
            right={10}
            minW={'300px'}
            minH={'500px'}
            w={'300px'}
            h={'500px'}
            direction={'column'}
            border={'1px solid lightgray'}
            overflow={'hidden'}
            zIndex={100000000}
            padding={2}
            background={'white'}
            {...props}
        >
            <Flex
                direction={'column'}
                flex={1}
                h={'100%'}
                w={'100%'}
                position={'relative'}
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
                onScroll={onScroll}
            >
                {announcements.map((ann) => (
                    <AlertAnnouncementItem key={ann.id} announcement={ann} />
                ))}
            </Flex>
            {triggerSpinner && (
                <Flex
                    padding={'5px 0px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'30px'}
                    w={'100%'}
                >
                    <Spinner />
                </Flex>
            )}
        </Flex>
    )
}
