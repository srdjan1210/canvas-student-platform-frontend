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

export interface Props {
    onDragging: (student: Student) => void
    onDrop: () => void
    onDraggingEnd: () => void
    dragged: Student | null
    students: Student[]
}

export const StudentDndContainer = ({
    onDragging,
    onDrop,
    dragged,
    onDraggingEnd,
    students,
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
            {students.map((student) => (
                <Flex
                    onDragStart={() => onDragging(student)}
                    onDragEnd={() => onDraggingEnd()}
                    draggable={true}
                    key={student.id}
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
                        {student.name}
                    </Heading>
                    <Heading as={'h2'} fontSize={'1.5rem'}>
                        {student.surname}
                    </Heading>
                    <Heading as={'h2'} fontSize={'1.5rem'}>
                        {student.fullIndex}
                    </Heading>
                </Flex>
            ))}
        </Flex>
    )
}
