import {
    addProxyDefaultValue,
    extractFileExtension,
} from '../../../shared/utils/utils'
import {
    AiFillFolder,
    AiOutlineFile,
    AiOutlineFilePdf,
    AiOutlineFilePpt,
} from 'react-icons/ai'
import { Flex, Text } from '@chakra-ui/react'

interface Props {
    filename: string
    type: 'folder' | 'file'
    onClick: () => void
}

export const FlatFileView = ({ filename, type, onClick }: Props) => {
    const ICON_SIZE = 60
    const files = addProxyDefaultValue(
        {
            pdf: <AiOutlineFilePdf size={ICON_SIZE} color={'red'} />,
            powerpoint: <AiOutlineFilePpt size={ICON_SIZE} color={'orange'} />,
        },
        <AiOutlineFile size={ICON_SIZE} />
    )

    const extension = extractFileExtension(filename)

    return (
        <Flex
            w={'100%'}
            h={100}
            maxH={100}
            minH={100}
            borderBottom={'1px solid lightgray'}
            onClick={() => onClick()}
            cursor={'pointer'}
            _hover={{
                background: 'lightgray',
            }}
        >
            <Flex alignItems={'center'}>
                {type === 'folder' ? (
                    <AiFillFolder size={ICON_SIZE} color={'#03b1fc'} />
                ) : (
                    files[extension]
                )}
                <Text
                    fontSize={'1.2em'}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    {filename}
                </Text>
            </Flex>
        </Flex>
    )
}

export default FlatFileView
