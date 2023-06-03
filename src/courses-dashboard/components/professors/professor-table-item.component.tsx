import { Td, Tr } from '@chakra-ui/react'
import { Professor } from '../../../users/model/professor.model'
import { DeleteButton } from '../shared/delete-button'

export interface Props {
    professor: Professor
    onDelete: () => void
}
export const ProfessorTableItem = ({ professor, onDelete }: Props) => {
    return (
        <Tr>
            <Td textAlign={'center'}>{professor.name}</Td>
            <Td textAlign={'center'}>{professor.surname}</Td>
            <Td textAlign={'center'}>{professor.title}</Td>
            <Td textAlign={'center'}>
                <DeleteButton onClick={() => onDelete()}>Delete</DeleteButton>
            </Td>
        </Tr>
    )
}
