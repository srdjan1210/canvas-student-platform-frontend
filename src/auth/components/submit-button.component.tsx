import { Button, ButtonProps, ChakraProps } from "@chakra-ui/react"
import { Children } from "../../shared/types"



export interface Props {
    children?: Children,
    onSubmit: (e: any) => void
}


export const SubmitButton = ({ children, onSubmit, ...props }: Props & ButtonProps) => {
    return (
        <Button onClick={onSubmit} {...props}>
            {children}
        </Button>
    )
}