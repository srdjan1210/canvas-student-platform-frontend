import { MyCourseScore } from '../../../api/courses/types/my-course-score.type'
import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

export interface Props {
    score: MyCourseScore
}
export const TestStatus = ({ score }: Props) => {
    const [status, setStatus] = useState(false)

    useEffect(() => {
        const date = new Date(score.submissionDate)
        const today = new Date()
        const status =
            score.submissionDate == null || date.getTime() >= today.getTime()
        setStatus(status)
    }, [score.submissionDate])

    return (
        <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
            <Box
                h={'15px'}
                w={'15px'}
                background={status ? 'green' : 'red'}
                borderRadius={'50%'}
            />
            {status ? 'Active' : 'Expired'}
        </Flex>
    )
}
