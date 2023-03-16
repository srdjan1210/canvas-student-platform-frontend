import { Flex, Spinner } from '@chakra-ui/react'

export interface Props {
    spinner: boolean
}
export const GlobalSpinner = ({ spinner }: Props) => {
    return (
        <>
            {spinner && (
                <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                    w={'100%'}
                    h={'100%'}
                    background={'rgba(1, 1, 1, 0.5)'}
                >
                    <Spinner boxSize={40} color={'white'} />
                </Flex>
            )}
        </>
    )
}
