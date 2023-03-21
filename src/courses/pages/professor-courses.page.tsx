import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Course } from '../model/course.model'
import CourseCard from '../components/course-card.component'
import { NoCourses } from '../components/no-courses.component'
import { useNavigate } from 'react-router-dom'
import useCourseService from '../services/course.service'

export const ProfessorCoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const navigate = useNavigate()
    const { getProfessorCourses } = useCourseService()

    const loadCourses = async () => {
        const courses = await getProfessorCourses()
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
                <Flex
                    flexWrap={'wrap'}
                    gap={20}
                    padding={30}
                    overflowY={'scroll'}
                    w={'100%'}
                >
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

export default ProfessorCoursesPage
