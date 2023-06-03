import { Button, ButtonProps } from '@chakra-ui/react'

export const DeleteButton = ({
    children,
    ...props
}: React.PropsWithChildren & ButtonProps) => {
    return (
        <Button color={'white'} background={'red'} {...props}>
            {children}
        </Button>
    )
}
