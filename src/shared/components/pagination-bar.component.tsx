import { Button, Flex, Heading } from '@chakra-ui/react'

export interface Props {
    previousDisabled: boolean
    nextDisabled: boolean
    onPrevious: () => void
    onNext: () => void
}
export const PaginationBar = ({
    previousDisabled,
    nextDisabled,
    onPrevious,
    onNext,
}: Props) => {
    return (
        <Flex
            w={'100%'}
            justifyContent={'space-between'}
            alignSelf={'flex-end'}
        >
            <Button
                isDisabled={previousDisabled}
                background={'green'}
                color={'white'}
                onClick={() => onPrevious()}
                minW={100}
            >
                Previous
            </Button>
            <Button
                onClick={() => onNext()}
                isDisabled={nextDisabled}
                background={'green'}
                color={'white'}
                minW={100}
            >
                Next
            </Button>
        </Flex>
    )
}
