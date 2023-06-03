import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { StudentTestScore } from '../../api/courses/types/student-test-score'
import {
    Button,
    Flex,
    Input,
    Link,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Thead,
    Tr,
} from '@chakra-ui/react'

import { useGetTestSubmissions } from '../../api/courses/tests/useGetTestSubmissions'

export const CourseTestSubmissionsPage = () => {
    const { title, testId } = useParams()
    const [testScores, setTestScores] = useState<StudentTestScore[]>([])
    const { getTestSubmissions } = useGetTestSubmissions()
    const loadTestScores = async () => {
        const submissions = await getTestSubmissions(
            title ?? '',
            +(testId ?? '0')
        )
        setTestScores(submissions)
    }

    useEffect(() => {
        loadTestScores()
    }, [])

    return (
        <Flex
            h={'100%'}
            alignItems={'center'}
            direction={'column'}
            maxH={'100%'}
            overflowY={'scroll'}
        >
            <TableContainer w={'80%'} paddingTop={'80px'}>
                <Table>
                    <Thead>
                        <Tr>
                            <Td>Name</Td>
                            <Td>Surname</Td>
                            <Td>FullIndex</Td>
                            <Td>Points</Td>
                            <Td>Submission Url</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {testScores.map((test) => (
                            <Tr key={test.id}>
                                <Td>{test.name}</Td>
                                <Td>{test.surname}</Td>
                                <Td>{test.fullIndex}</Td>
                                <Td>
                                    <Input
                                        type="number"
                                        value={test.points ?? '0'}
                                    />
                                </Td>
                                <Td>
                                    {test.fileUrl ? (
                                        <Link href={test.fileUrl} isExternal>
                                            Submission
                                        </Link>
                                    ) : (
                                        'No Submission'
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}
