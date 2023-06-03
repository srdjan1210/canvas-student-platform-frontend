import { useGetCourseTests } from '../../../api/courses/tests/useGetCourseTests'
import { useDeleteTest } from '../../../api/courses/tests/useDeleteTest'
import {
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CourseTest } from '../../../api/courses/types/course-test'
import { AddButton } from '../../components/shared/add-button'
import { CreateTestForm } from '../../components/tests/create-test-form.component'
import { TestTableItem } from '../../components/tests/test-table-item.component'
import { ScrollableTable } from '../../components/shared/scrollable-table'
import { FlexTableWrapper } from '../../components/shared/flex-table-wrapper.component'

export const CourseTestsPage = () => {
    const { title = '' } = useParams()
    const { getCourseTests } = useGetCourseTests()
    const { deleteTest } = useDeleteTest()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const [tests, setTests] = useState<CourseTest[]>([])

    const loadTests = async () => {
        const tests = await getCourseTests(title)
        setTests(tests)
    }

    const handleCreateTest = () => {
        onOpen()
    }

    const handleDeleteTest = async (testId: number) => {
        await deleteTest(testId)
        await loadTests()
    }

    const handleSubmissions = (id: number) => {
        navigate(`/dashboard/courses/${title}/tests/${id}/submissions`)
    }

    useEffect(() => {
        loadTests()
    }, [])

    return (
        <FlexTableWrapper>
            <Flex className={'test-options'} justifyContent={'flex-end'}>
                <AddButton onClick={handleCreateTest}>Create Test</AddButton>
            </Flex>
            <ScrollableTable>
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Course</Th>
                        <Th textAlign={'center'}>Title</Th>
                        <Th textAlign={'center'}>Description</Th>
                        <Th textAlign={'center'}>Max. points</Th>
                        <Th textAlign={'center'}>Deadline for Submission</Th>
                        <Th textAlign={'center'}>Delete</Th>
                        <Th textAlign={'center'}>Submissions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tests.map((test) => (
                        <TestTableItem
                            key={test.id}
                            test={test}
                            onDelete={() => handleDeleteTest(test.id)}
                            onSubmissions={() => handleSubmissions(test.id)}
                        />
                    ))}
                </Tbody>
            </ScrollableTable>

            <CreateTestForm
                isOpen={isOpen}
                onClose={onClose}
                onCreateTest={() => loadTests()}
                course={title}
            />
        </FlexTableWrapper>
    )
}
