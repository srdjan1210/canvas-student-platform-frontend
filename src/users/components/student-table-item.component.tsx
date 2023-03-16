import { Checkbox, Flex, Td, Tr } from '@chakra-ui/react'
import { Student } from '../model/student.model'

export interface Props {
    isSelected: boolean
    onSelectChange: () => void
    student: Student
}
export const StudentTableItem = ({
    student,
    isSelected,
    onSelectChange,
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
            <Td textAlign={'center'}>
                <Checkbox
                    isChecked={isSelected}
                    onChange={(e: any) => onSelectChange()}
                />
            </Td>
        </Tr>
    )
}
export default StudentTableItem
