import { CourseTest } from '../../../api/courses/types/course-test'
import { Button, Td, Tr } from '@chakra-ui/react'
import { formatDatePretty } from '../../../shared/utils/utils'
import { DeleteButton } from '../shared/delete-button'
import { NavigationButton } from '../shared/navigation-button.component'

export interface Props {
    test: CourseTest
    onDelete: () => void
    onSubmissions: () => void
}
export const TestTableItem = ({ test, onDelete, onSubmissions }: Props) => {
    return (
        <Tr>
            <Td textAlign={'center'}>{test.courseTitle}</Td>
            <Td textAlign={'center'}>{test.title}</Td>
            <Td textAlign={'center'}>{test.description}</Td>
            <Td textAlign={'center'}>{test.maxPoints}</Td>
            <Td textAlign={'center'}>
                {test.deadlineForSubmission
                    ? formatDatePretty(test.deadlineForSubmission)
                    : 'No restriction'}
            </Td>
            <Td textAlign={'center'}>
                <DeleteButton onClick={() => onDelete()}>Delete</DeleteButton>
            </Td>
            <Td textAlign={'center'}>
                <NavigationButton onClick={() => onSubmissions()}>
                    Submissions
                </NavigationButton>
            </Td>
        </Tr>
    )
}
