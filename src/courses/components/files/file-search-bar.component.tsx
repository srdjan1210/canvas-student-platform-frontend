import { Flex, Input, Text, Tooltip } from '@chakra-ui/react'
import { FileBoxSwitch } from './file-box-switch.component'

interface Props {
    path?: string
}
export const FileSearchBar = ({ path }: Props) => {
    return (
        <Flex
            w={'100%'}
            padding={'0 80px'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={10}
            h={100}
            minH={100}
            position={'relative'}
        >
            <Flex gap={10} alignItems={'center'}>
                <Input placeholder={'Search files'} w={500} size={'lg'} />
                <FileBoxSwitch />
            </Flex>

            <Tooltip label={path}>
                <Text
                    fontSize={'1.4em'}
                    fontWeight={'bold'}
                    justifySelf={'flex-start'}
                    position={'absolute'}
                    left={'0'}
                    maxW={200}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                    whiteSpace={'nowrap'}
                >
                    {path}
                </Text>
            </Tooltip>
        </Flex>
    )
}
