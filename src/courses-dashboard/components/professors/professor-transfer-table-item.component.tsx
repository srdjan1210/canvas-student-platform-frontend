import { Checkbox, Td, Tr } from '@chakra-ui/react'
import { useState } from 'react'
import { Professor } from '../../../users/model/professor.model'
import { AddButton } from '../shared/add-button'

export interface Props {
    professor: Professor
    onSelected: () => void
    isSelected: boolean
}
export const ProfessorTransferTableItem = ({
    professor,
    onSelected,
    isSelected,
}: Props) => {
    const handleClick = (e: any) => {
        if (e.target?.type !== 'checkbox') {
            onSelected()
        }
    }
    return (
        <Tr
            onClick={handleClick}
            css={isSelected ? { background: 'lightblue' } : undefined}
            cursor={'pointer'}
        >
            <Td textAlign={'center'}>{professor.name}</Td>
            <Td textAlign={'center'}>{professor.surname}</Td>
            <Td textAlign={'center'}>{professor.title}</Td>
            <Td textAlign={'center'}>
                <Checkbox isChecked={isSelected} />
            </Td>
        </Tr>
    )
}
