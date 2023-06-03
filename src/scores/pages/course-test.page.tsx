import { useParams } from 'react-router-dom'
import { Flex, Text } from '@chakra-ui/react'
import { useGetCourseTest } from '../../api/courses/tests/useGetCourseTest'
import { useEffect, useState } from 'react'
import { CourseTest } from '../../api/courses/types/course-test'

export const CourseTestPage = () => {
    const { title, testId } = useParams()
    const [courseTest, setCourseTest] = useState<CourseTest>()
    const { getCourseTest } = useGetCourseTest()

    const loadCourseTest = async () => {
        const test = await getCourseTest(+(testId ?? '0'))
        setCourseTest(test)
    }

    useEffect(() => {
        loadCourseTest()
    }, [])

    return (
        <Flex>
            <Flex>
                <Text>{courseTest?.courseTitle}</Text>
            </Flex>
        </Flex>
    )
}
