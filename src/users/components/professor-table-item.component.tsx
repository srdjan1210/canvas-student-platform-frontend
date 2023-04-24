import { Student } from '../model/student.model'
import { Button, Checkbox, Td, Tr } from '@chakra-ui/react'
import { Professor } from '../model/professor.model'

export interface Props {
    isSelected: boolean
    onSelectChange: () => void
    professor: Professor
    onRemove?: () => void
}
export const ProfessorTableItem = ({
    professor,
    isSelected,
    onSelectChange,
    onRemove,
}: Props) => {
    return (
        <Tr
            onClick={() => onSelectChange()}
            h={90}
            maxH={90}
            background={isSelected ? 'lightgray' : ''}
            cursor={'pointer'}
            _hover={{
                background: 'lightgray',
            }}
        >
            <Td textAlign={'center'}>{professor.name}</Td>
            <Td textAlign={'center'}>{professor.surname}</Td>
            <Td textAlign={'center'}>{professor.title}</Td>
            {onRemove && (
                <Td textAlign={'center'}>
                    <Button
                        background={'red'}
                        color={'white'}
                        onClick={() => onRemove()}
                    >
                        Remove
                    </Button>
                </Td>
            )}
        </Tr>
    )
}
export default ProfessorTableItem
