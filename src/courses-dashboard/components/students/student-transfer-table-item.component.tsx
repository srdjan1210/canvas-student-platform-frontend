import { Student } from '../../../users/model/student.model'
import { Checkbox, Td, Tr } from '@chakra-ui/react'

export interface Props {
    student: Student
    isSelected: boolean
    onSelected: () => void
}

export const StudentTransferTableItem = ({
    student,
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
            <Td textAlign={'center'}>{student.name}</Td>
            <Td textAlign={'center'}>{student.surname}</Td>
            <Td textAlign={'center'}>{student.fullIndex}</Td>
            <Td textAlign={'center'}>
                <Checkbox isChecked={isSelected} />
            </Td>
        </Tr>
    )
}
