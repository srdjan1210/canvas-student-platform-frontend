import { Button, ButtonProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const NavigationButton = ({
    children,
    ...props
}: PropsWithChildren & ButtonProps) => (
    <Button color={'white'} background={'blue'} {...props}>
        {children}
    </Button>
)
