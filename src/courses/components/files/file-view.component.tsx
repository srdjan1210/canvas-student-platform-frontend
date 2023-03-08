import { Flex, Text } from '@chakra-ui/react'
import {
    AiOutlineFile,
    AiOutlineFilePdf,
    AiOutlineFilePpt,
    AiFillFolder,
} from 'react-icons/ai'
import {
    addProxyDefaultValue,
    extractFileExtension,
} from '../../../shared/utils/utils'

import { IoMdArrowBack } from 'react-icons/io'

interface Props {
    filename: string
    type: 'folder' | 'file' | 'back'
    onClick: () => void
}

export const FileView = ({ filename, type, onClick }: Props) => {
    const files = addProxyDefaultValue(
        {
            pdf: <AiOutlineFilePdf size={'100%'} color={'red'} />,
            ppt: <AiOutlineFilePpt size={'100%'} color={'orange'} />,
        },
        <AiOutlineFile size={'100%'} />
    )

    const extension = extractFileExtension(filename)

    return (
        <Flex
            direction={'column'}
            h={300}
            w={250}
            maxH={300}
            maxW={250}
            border={'1px solid lightgray'}
            className={'file'}
            cursor={'pointer'}
            onClick={() => onClick()}
            _hover={{ boxShadow: '2xl' }}
        >
            <Flex flex={2}>
                {type === 'folder' && (
                    <AiFillFolder size={'100%'} color={'#03b1fc'} />
                )}
                {type === 'file' && files[extension]}
                {type === 'back' && <IoMdArrowBack size={'100%'} />}
            </Flex>
            <Text
                fontSize={'1.2em'}
                fontWeight={'bold'}
                textAlign={'center'}
                flex={1}
            >
                {filename}
            </Text>
        </Flex>
    )
}

export default FileView
