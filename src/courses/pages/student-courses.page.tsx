import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Course } from '../model/course.model'
import { courseService } from '../services/course.service'
import CourseCard from '../components/course-card.component'
import { NoCourses } from '../components/no-courses.component'
import { useNavigate } from 'react-router-dom'

export const StudentCoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const navigate = useNavigate()
    const loadCourses = async () => {
        const courses = await courseService.getStudentCourses()
        setCourses(courses)
    }

    const openCourse = (name: string) => {
        navigate(`/dashboard/student/course/${name}`)
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
