import { Student } from '../../users/model/student.model'
import {
    Box,
    Button,
    Flex,
    FlexboxProps,
    FlexProps,
    Heading,
    Input,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { PaginationBar } from '../../shared/components/pagination-bar.component'
import { useApplicationStore } from '../../store/application.store'
import { Professor } from '../../users/model/professor.model'

export interface Props {
    onDragging: (professor: Professor) => void
    onDrop: () => void
    onDraggingEnd: () => void
    dragged: Professor | null
    professors: Professor[]
}

export const ProfessorDndContainer = ({
    onDragging,
    onDrop,
    dragged,
    onDraggingEnd,
    professors,
    ...props
}: Props & FlexProps) => {
    return (
        <Flex
            direction={'column'}
            overflowY={'scroll'}
            onDrop={() => onDrop()}
            onDragOver={(e) => e.preventDefault()}
            border={dragged ? '1px solid blue' : '1px solid lightgray'}
            flex={1}
            css={{
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'gray',
                    borderRadius: '24px',
                },
                '&:hover::-webkit-scrollbar': {
                    width: '10px',
                },
            }}
            {...props}
        >
            {professors.map((professor) => (
                <Flex
                    onDragStart={() => onDragging(professor)}
                    onDragEnd={() => onDraggingEnd()}
                    draggable={true}
                    key={professor.id}
                    border={'1px solid lightgray'}
                    h={100}
                    minH={100}
                    alignItems={'center'}
                    gap={2}
                    justifyContent={'center'}
                    cursor={'pointer'}
                    _hover={{ background: 'gray' }}
                >
                    <Heading as={'h2'} fontSize={'1.5rem'}>
                        {professor.name}
                    </Heading>
                    <Heading as={'h2'} fontSize={'1.5rem'}>
                        {professor.surname}
                    </Heading>
                    <Heading as={'h2'} fontSize={'1.5rem'}>
                        {professor.title}
                    </Heading>
                </Flex>
            ))}
        </Flex>
    )
}
