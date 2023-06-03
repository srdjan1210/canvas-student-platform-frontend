import { Link, Td, Th, Tr } from '@chakra-ui/react'
import { StudentTestScore } from '../../../api/courses/types/student-test-score'
import { MyCourseScore } from '../../../api/courses/types/my-course-score.type'
import { formatDatePretty } from '../../../shared/utils/utils'
import { TestStatus } from './test-status.component'
import { UploadFileButton } from '../shared/upload-file-button'

export interface Props {
    score: MyCourseScore
    onFileUpload: (file: File) => void
}
export const MyCourseScoresTableItem = ({ score, onFileUpload }: Props) => {
    console.log(score)
    const date = new Date(score.submissionDate)
    const today = new Date()
    const isDisabled = () =>
        !(score.submissionDate == null || date.getTime() >= today.getTime())
    return (
        <Tr>
            <Td textAlign={'center'}>{score.title}</Td>
            <Td textAlign={'center'}>
                {score.submissionDate
                    ? formatDatePretty(score.submissionDate)
                    : 'No Restriction'}
            </Td>
            <Td textAlign={'center'}>{`${score.points ?? '0'}/${
                score.maxPoints
            }`}</Td>
            <Td textAlign={'center'}>
                <TestStatus score={score} />
            </Td>
            <Td textAlign={'center'}>
                <UploadFileButton
                    id={'file-upload-' + score.testId}
                    onUploadFile={(file) => onFileUpload(file)}
                    disabled={isDisabled()}
                />
            </Td>
            <Td textAlign={'center'}>
                {score.lastSubmission ? (
                    <Link download href={score.lastSubmission}>
                        Download
                    </Link>
                ) : (
                    'No Submissions'
                )}
            </Td>
        </Tr>
    )
}
