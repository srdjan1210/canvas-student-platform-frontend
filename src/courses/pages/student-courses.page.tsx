import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Course } from '../model/course.model'
import CourseCard from '../components/course-card.component'
import { NoCourses } from '../components/no-courses.component'
import { useNavigate } from 'react-router-dom'
import useCourseService from '../services/course.service'

export const StudentCoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const navigate = useNavigate()
    const { getStudentCourses } = useCourseService()
    const loadCourses = async () => {
        const courses = await getStudentCourses()
        setCourses(courses)
    }

    const openCourse = (name: string) => {
        navigate(`/dashboard/courses/${name}`)
    }

    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <>
            {courses.length === 0 ? (
                <NoCourses />
            ) : (
                <Flex flexWrap={'wrap'} gap={20} padding={30}>
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            title={course.title}
                            description={course.description}
                            onClick={() => openCourse(course.title)}
                        />
                    ))}
                </Flex>
            )}
        </>
    )
}

export default StudentCoursesPage
