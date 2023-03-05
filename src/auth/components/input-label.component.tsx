import { ChakraProps, Flex, Input, InputElementProps, InputProps } from "@chakra-ui/react"
import { InputHTMLAttributes } from "react"


export interface Props {
    text: string,
    value?: string,
}

export const InputLabel = ({ text, value, ...props }: Props & InputProps) => {
    return (
        <Flex direction={'column'} w={"100%"} h={"100%"}>
            <label>{text}</label>
            <Input value={value}  {...props} />
        </Flex>
    )

}
