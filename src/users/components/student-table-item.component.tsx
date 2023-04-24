import { Button, Checkbox, Flex, Td, Tr } from '@chakra-ui/react'
import { Student } from '../model/student.model'

export interface Props {
    isSelected: boolean
    onSelectChange: () => void
    student: Student
    onRemove?: () => void
}
export const StudentTableItem = ({
    student,
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
            <Td textAlign={'center'}>{student.name}</Td>
            <Td textAlign={'center'}>{student.surname}</Td>
            <Td textAlign={'center'}>{student.fullIndex}</Td>
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
export default StudentTableItem
