import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import { CreateTestForm } from '../components/create-test-form.component'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCourseTests } from '../../api/courses/tests/useGetCourseTests'
import { useEffect, useState } from 'react'
import { CourseTest } from '../../api/courses/types/course-test'
import { useDeleteTest } from '../../api/courses/tests/useDeleteTest'

export const CourseTestsPage = () => {
    const { getCourseTests } = useGetCourseTests()
    const { deleteTest } = useDeleteTest()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const { title } = useParams()
    const [tests, setTests] = useState<CourseTest[]>([])

    const loadTests = async () => {
        const tests = await getCourseTests(title ?? '')
        setTests(tests)
    }

    const handleDeleteTest = async (testId: number) => {
        await deleteTest(testId)
        await loadTests()
    }

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'No restriction'
        const dt = new Date(date)
        const year = dt.getFullYear()
        const month = dt.getMonth() + 1
        const day = dt.getDate()

        return `${day}-${month}-${year}`
    }

    const handleSubmissions = (testId: number) => {
        navigate(`/dashboard/courses/${title}/tests/${testId}`)
    }

    useEffect(() => {
        loadTests()
    }, [])

    return (
        <Flex
            h={'100%'}
            alignItems={'center'}
            direction={'column'}
            maxH={'100%'}
            overflowY={'scroll'}
        >
            <Flex
                className={'header'}
                w={'80%'}
                h={'80px'}
                alignItems={'center'}
                justifyContent={'flex-end'}
            >
                <Button
                    background={'green'}
                    color={'white'}
                    onClick={() => onOpen()}
                >
                    Create test
                </Button>
            </Flex>
            <TableContainer w={'80%'}>
                <Table>
                    <Thead>
                        <Tr>
                            <Td>Course</Td>
                            <Td>Title</Td>
                            <Td>Description</Td>
                            <Td>Max. points</Td>
                            <Td>Deadline for Submission</Td>
                            <Td>Delete</Td>
                            <Td>Submissions</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tests.map((test) => (
                            <Tr key={test.id}>
                                <Td>{test.courseTitle}</Td>
                                <Td>{test.title}</Td>
                                <Td>{test.description}</Td>
                                <Td>{test.maxPoints}</Td>
                                <Td>
                                    {formatDate(test.deadlineForSubmission)}
                                </Td>
                                <Td>
                                    <Button
                                        onClick={() =>
                                            handleDeleteTest(test.id)
                                        }
                                        color={'white'}
                                        background={'red'}
                                    >
                                        Delete
                                    </Button>
                                </Td>
                                <Td>
                                    <Button
                                        onClick={() =>
                                            handleSubmissions(test.id)
                                        }
                                        color={'white'}
                                        background={'blue'}
                                    >
                                        Submissions
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <CreateTestForm
                isOpen={isOpen}
                onClose={onClose}
                onCreateTest={() => {
                    loadTests()
                }}
                course={title ?? ''}
            />
        </Flex>
    )
}
