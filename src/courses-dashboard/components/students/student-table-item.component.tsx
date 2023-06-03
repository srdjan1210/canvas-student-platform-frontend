import { Student } from '../../../users/model/student.model'
import { Button, Flex, Td, Tr } from '@chakra-ui/react'
import { DeleteButton } from '../shared/delete-button'

export interface Props {
    student: Student
    onDelete: () => void
}
export const StudentTableItem = ({ student, onDelete }: Props) => {
    return (
        <Tr>
            <Td textAlign={'center'}>{student.name}</Td>
            <Td textAlign={'center'}>{student.surname}</Td>
            <Td textAlign={'center'}>{student.fullIndex}</Td>
            <Td textAlign={'center'}>
                <DeleteButton onClick={() => onDelete()}>Delete</DeleteButton>
            </Td>
        </Tr>
    )
}
