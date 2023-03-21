import { useEffect, useState } from 'react'
import { Course } from '../model/course.model'
import { useNavigate } from 'react-router-dom'
import useCourseService from '../services/course.service'
import { NoCourses } from '../components/no-courses.component'
import { Flex } from '@chakra-ui/react'
import CourseCard from '../components/course-card.component'

export const AdminCoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const navigate = useNavigate()
    const { getAll } = useCourseService()
    const loadCourses = async () => {
        const courses = await getAll()
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
                    justifyContent={'flex-start'}
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
