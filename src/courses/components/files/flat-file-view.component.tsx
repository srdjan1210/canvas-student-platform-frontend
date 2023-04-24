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
import { Button, Flex, Text } from '@chakra-ui/react'
import { IoMdArrowBack } from 'react-icons/io'
import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { useApplicationStore } from '../../../store/application.store'

interface Props {
    filename: string
    type: 'folder' | 'file' | 'back'
    onClick: () => void
    onDelete: () => void
}

export const FlatFileView = ({ filename, type, onClick, onDelete }: Props) => {
    const [showOptions, setShowOptions] = useState(false)
    const authenticated = useApplicationStore((state) => state.user)
    const ICON_SIZE = 60
    const files = addProxyDefaultValue(
        {
            pdf: <AiOutlineFilePdf size={ICON_SIZE} color={'red'} />,
            powerpoint: <AiOutlineFilePpt size={ICON_SIZE} color={'orange'} />,
        },
        <AiOutlineFile size={ICON_SIZE} />
    )
    const extension = extractFileExtension(filename)

    const handleClick = (event: React.MouseEvent) => {
        if (event.currentTarget === event.target) onClick()
    }

    return (
        <Flex
            w={'100%'}
            h={100}
            maxH={100}
            minH={100}
            borderBottom={'1px solid lightgray'}
            onClick={handleClick}
            cursor={'pointer'}
            _hover={{
                background: 'lightgray',
            }}
            onMouseOver={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Flex alignItems={'center'}>
                {type === 'folder' && (
                    <AiFillFolder size={ICON_SIZE} color={'#03b1fc'} />
                )}
                {type === 'file' && files[extension]}
                {type === 'back' && <IoMdArrowBack size={ICON_SIZE} />}
                <Text
                    fontSize={'1.2em'}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    {filename}
                </Text>
            </Flex>
            {showOptions &&
                type != 'folder' &&
                authenticated?.role !== 'STUDENT' && (
                    <Button
                        background={'red'}
                        color={'white'}
                        marginRight={10}
                        onClick={() => onDelete()}
                    >
                        <BsFillTrashFill size={20} />
                    </Button>
                )}
        </Flex>
    )
}

export default FlatFileView
