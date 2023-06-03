import { Tbody, Th, Thead } from '@chakra-ui/react'
import { FlexTableWrapper } from '../../components/shared/flex-table-wrapper.component'
import { ScrollableTable } from '../../components/shared/scrollable-table'
import { MyCourseScoresTableItem } from '../../components/tests/my-course-scores-table-item.component'
import { useEffect, useState } from 'react'
import { MyCourseScore } from '../../../api/courses/types/my-course-score.type'
import { useGetAllStudentTestScoreWithNotSubmitted } from '../../../api/courses/tests/useGetAllStudentTestScoreWithNotSubmitted'
import { useParams } from 'react-router-dom'
import { TotalScores } from '../../components/tests/total-scores.component'
import { useUploadTestFile } from '../../../api/courses/tests/useUploadTestFile'

export const MyCourseScoresPage = () => {
    const { title = '' } = useParams()
    const [scores, setScores] = useState<MyCourseScore[]>([])
    const { getAllStudentTestScoreWithNotSubmitted } =
        useGetAllStudentTestScoreWithNotSubmitted()
    const { uploadTestFile } = useUploadTestFile()

    const loadScores = async () => {
        const scores = await getAllStudentTestScoreWithNotSubmitted(title)
        setScores(scores)
    }

    const handleFileSubmit = async (testId: number, file: File) => {
        console.log(title, testId, file)
        await uploadTestFile(title, testId, file)
        await loadScores()
    }

    useEffect(() => {
        loadScores()
    }, [])
    return (
        <FlexTableWrapper gap={1}>
            <ScrollableTable>
                <Thead>
                    <Th textAlign={'center'}>Test</Th>
                    <Th textAlign={'center'}>Active Until</Th>
                    <Th textAlign={'center'}>Points</Th>
                    <Th textAlign={'center'}>Status</Th>
                    <Th textAlign={'center'}>Upload</Th>
                    <Th textAlign={'center'}>Last Submitted</Th>
                </Thead>
                <Tbody>
                    {scores.map((score) => (
                        <MyCourseScoresTableItem
                            key={score.testId}
                            score={score}
                            onFileUpload={(file) =>
                                handleFileSubmit(score.testId, file)
                            }
                        />
                    ))}
                </Tbody>
            </ScrollableTable>
            <TotalScores scores={scores} />
        </FlexTableWrapper>
    )
}
