import { MyCourseScore } from '../../../api/courses/types/my-course-score.type'
import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export interface Props {
    scores: MyCourseScore[]
}
export const TotalScores = ({ scores }: Props) => {
    const [totalScore, setTotalScore] = useState('')

    useEffect(() => {
        const totalWon = scores.reduce(
            (result, score) => result + (score.points ?? 0),
            0
        )
        const totalMax = scores.reduce(
            (result, score) => result + score.maxPoints ?? 0,
            0
        )

        setTotalScore(`${totalWon}/${totalMax}`)
    }, [scores])

    return (
        <Flex
            w={'100%'}
            border={'1px solid lightgray'}
            padding={'5px'}
            alignItems={'center'}
        >
            <Text fontWeight={'bold'}>Total Score: {totalScore}</Text>
        </Flex>
    )
}
