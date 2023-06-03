import { Flex, FlexboxProps, FlexProps, Text } from '@chakra-ui/react'

export interface Props {
    onClick: () => void
    text: string
}

export const DashboardNavigationCard = ({
    onClick,
    text,
    ...props
}: Props & FlexProps) => {
    return (
        <Flex
            padding={2}
            h={'100px'}
            onClick={() => onClick()}
            border={'1px solid lightgray'}
            cursor={'pointer'}
            boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
            {...props}
        >
            <Text fontSize={'25px'} color={'gray'}>
                {text}
            </Text>
        </Flex>
    )
}
