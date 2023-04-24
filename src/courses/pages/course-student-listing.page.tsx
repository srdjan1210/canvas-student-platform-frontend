import {
    Button,
    Flex,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import StudentTableItem from '../../users/components/student-table-item.component'
import { PaginationBar } from '../../shared/components/pagination-bar.component'
import { GlobalSpinner } from '../../shared/components/spinner.component'
import { useEffect, useState } from 'react'
import { Student } from '../../users/model/student.model'
import { useApplicationStore } from '../../store/application.store'
import useCourseService from '../services/course.service'
import { useNavigate, useParams } from 'react-router-dom'

export const CourseStudentListingPage = () => {
    const { title } = useParams()
    const [page, setPage] = useState(1)
    const [students, setStudents] = useState<Student[]>([])
    const spinner = useApplicationStore((state) => state.spinner)
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const navigate = useNavigate()
    const { getCourseStudents, exportStudentsToCsv, removeStudentFromCourse } =
        useCourseService()

    const loadStudents = async (page = 1) => {
        setSpinner(true)
        const students = await getCourseStudents(title ?? '', page)
        setSpinner(false)
        setStudents(students)
    }
    const loadPaginated = async (page: number) => {
        await loadStudents(page)
        setPage(page)
    }

    const handleStudentRemoved = async (student: Student) => {
        await removeStudentFromCourse(title ?? '', student.id)
        await loadPaginated(page)
    }

    const handleAddStudents = () => {
        navigate(`/dashboard/courses/${title}/add/students`)
    }

    useEffect(() => {
        loadStudents()
    }, [])
    return (
        <Flex
            w={'100%'}
            justifyContent={'center'}
            h={'100%'}
            position={'relative'}
            direction={'column'}
            alignItems={'center'}
            gap={10}
        >
            <Flex
                w={'80%'}
                justifyContent={'space-between'}
                paddingTop={'40px'}
            >
                <Heading as={'h2'} fontSize={'1.5rem'}>
                    {title}(Students)
                </Heading>
                <Flex gap={5}>
                    <Button
                        color={'white'}
                        background={'green'}
                        onClick={handleAddStudents}
                    >
                        Add Students
                    </Button>
                    <Button
                        color={'white'}
                        background={'green'}
                        onClick={() => exportStudentsToCsv(title ?? '')}
                    >
                        Export to CSV
                    </Button>
                </Flex>
            </Flex>
            <Flex
                h={'100%'}
                w={'80%'}
                direction={'column'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                paddingBottom={10}
            >
                <TableContainer
                    w={'100%'}
                    h={'100%'}
                    alignItems={'space-between'}
                >
                    <Table variant={'simple'}>
                        <Thead>
                            <Tr>
                                <Th textAlign={'center'}>Name</Th>
                                <Th textAlign={'center'}>Surname</Th>
                                <Th textAlign={'center'}>Index</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {students.map((student) => (
                                <StudentTableItem
                                    key={student.id}
                                    student={student}
                                    isSelected={false}
                                    onSelectChange={() => void ''}
                                    onRemove={() =>
                                        handleStudentRemoved(student)
                                    }
                                />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <PaginationBar
                    previousDisabled={page <= 1}
                    nextDisabled={students.length == 0}
                    onPrevious={() => loadPaginated(page - 1)}
                    onNext={() => loadPaginated(page + 1)}
                />
            </Flex>
            <GlobalSpinner spinner={spinner} />
        </Flex>
    )
}

export default CourseStudentListingPage
