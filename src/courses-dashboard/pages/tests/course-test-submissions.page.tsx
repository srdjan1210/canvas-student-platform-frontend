import { Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { FlexTableWrapper } from '../../components/shared/flex-table-wrapper.component'
import { ScrollableTable } from '../../components/shared/scrollable-table'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { StudentTestScore } from '../../../api/courses/types/student-test-score'
import { useGetTestSubmissions } from '../../../api/courses/tests/useGetTestSubmissions'
import { SubmissionTableItem } from '../../components/tests/submission-table-item.component'
import { usePagination } from '../../hooks/usePagination'
import { PaginationBar } from '../../../shared/components/pagination-bar.component'
import { useUpdateScore } from '../../../api/courses/tests/useUpdateScore'

export const CourseTestSubmissionsPage = () => {
    const { title = '', testId = '0' } = useParams()
    const [submissions, setSubmissions] = useState<StudentTestScore[]>([])
    const { page, limit, next, previous } = usePagination()
    const { getTestSubmissions } = useGetTestSubmissions()
    const { updateStudentScore } = useUpdateScore()
    const loadTestScores = async () => {
        const submissions = await getTestSubmissions(
            title,
            +testId,
            page,
            limit
        )
        setSubmissions(submissions)
    }

    const handlePointsUpdated = async (
        submission: StudentTestScore,
        score: number
    ) => {
        await updateStudentScore({
            title,
            testId: submission.testId,
            score,
            studentId: submission.id,
        })
    }

    useEffect(() => {
        loadTestScores()
    }, [page])
    return (
        <FlexTableWrapper>
            <ScrollableTable>
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Name</Th>
                        <Th textAlign={'center'}>Surname </Th>
                        <Th textAlign={'center'}>FullIndex</Th>
                        <Th textAlign={'center'}>Points</Th>
                        <Th textAlign={'center'}>Submission Url</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {submissions.map((submission) => (
                        <SubmissionTableItem
                            key={submission.id}
                            submission={submission}
                            onPointsEdited={(score) =>
                                handlePointsUpdated(submission, score)
                            }
                        />
                    ))}
                </Tbody>
            </ScrollableTable>
            <PaginationBar
                previousDisabled={page === 1}
                nextDisabled={submissions.length <= limit}
                onPrevious={() => previous()}
                onNext={() => next()}
            />
        </FlexTableWrapper>
    )
}
