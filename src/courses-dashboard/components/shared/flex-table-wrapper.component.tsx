import { PropsWithChildren } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

export const FlexTableWrapper = ({
    children,
    ...props
}: PropsWithChildren & FlexProps) => (
    <Flex w={'100%'} h={'100%'} direction={'column'} gap={5} {...props}>
        {children}
    </Flex>
)
