import { useEffect, useState } from 'react'
import { Course } from '../model/course.model'
import { useNavigate } from 'react-router-dom'
import { NoCourses } from '../components/no-courses.component'
import { Flex } from '@chakra-ui/react'
import CourseCard from '../components/course-card.component'
import { useGetAllCourses } from '../../api/courses/useGetAllCourses'

export const AdminCoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const navigate = useNavigate()
    const { getAllCourses } = useGetAllCourses()
    const loadCourses = async () => {
        const courses = await getAllCourses()
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
