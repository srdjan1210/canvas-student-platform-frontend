import { Button, ButtonProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export const AddButton = ({
    children,
    ...props
}: PropsWithChildren & ButtonProps) => {
    return (
        <Button color={'white'} background={'green'} {...props}>
            {children}
        </Button>
    )
}
