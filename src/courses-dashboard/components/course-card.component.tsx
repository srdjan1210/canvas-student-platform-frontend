import { Flex, Text, Image, Tooltip } from '@chakra-ui/react'

export interface Props {
    description: string
    title: string
    onClick?: () => void
}
export const CourseCard = ({ title, description, onClick }: Props) => {
    return (
        <Flex
            direction={'column'}
            h={350}
            w={350}
            maxH={350}
            maxW={350}
            border={'1px solid lightgray'}
            boxShadow={'md'}
            cursor={'pointer'}
            _hover={{
                boxShadow: 'dark-lg',
            }}
            position={'relative'}
            onClick={() => (onClick ? onClick() : {})}
        >
            <Flex className="img" flex={2}>
                <Image objectFit="cover" src="/course-image.jpg" alt="Course" />
            </Flex>
            <Flex
                alignItems={'center'}
                justifyContent={'center'}
                className="description"
                direction={'column'}
                flex={1}
                padding={5}
            >
                <Text
                    className="title"
                    fontWeight={'bold'}
                    fontSize={'1.4em'}
                    textOverflow={'ellipsis'}
                    wordBreak={'break-word'}
                    lineHeight={'1.5em'}
                    maxH={'1.5em'}
                    overflow={'hidden'}
                >
                    {title}
                </Text>
                <Tooltip label={description}>
                    <Text
                        className="description"
                        textAlign={'center'}
                        fontSize={'1em'}
                        textOverflow={'ellipsis'}
                        wordBreak={'break-word'}
                        lineHeight={'1.3em'}
                        maxH={'2.6em'}
                        overflow={'hidden'}
                    >
                        {description}
                    </Text>
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default CourseCard
