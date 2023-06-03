import {
    Flex,
    Table,
    TableContainer,
    Tbody,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Student } from '../../../users/model/student.model'
import { useGetCourseStudents } from '../../../api/courses/useGetCourseStudents'
import { useNavigate, useParams } from 'react-router-dom'
import { usePagination } from '../../hooks/usePagination'
import { StudentTableItem } from '../../components/students/student-table-item.component'
import { useRemoveStudentFromCourse } from '../../../api/courses/useRemoveStudentFromCourse'
import { PaginationBar } from '../../../shared/components/pagination-bar.component'
import { AddButton } from '../../components/shared/add-button'
import { useExportStudentsToCsv } from '../../../api/courses/csv/useExportStudentsToCsv'
import { SCROLL_HOVER_DEFAULT } from '../../../shared/utils/utils'
import { FlexTableWrapper } from '../../components/shared/flex-table-wrapper.component'
import { ScrollableTable } from '../../components/shared/scrollable-table'
import { NavigationButton } from '../../components/shared/navigation-button.component'

export const CourseStudentsPage = () => {
    const { title = '' } = useParams()
    const [students, setStudents] = useState<Student[]>([])
    const { getCourseStudents } = useGetCourseStudents()
    const { removeStudentFromCourse } = useRemoveStudentFromCourse()
    const { exportStudentsToCsv } = useExportStudentsToCsv()
    const { page, next, previous, limit } = usePagination()
    const navigate = useNavigate()

    const handleDelete = async (id: number) => {
        await removeStudentFromCourse(title, id)
        await loadStudents()
    }

    const loadStudents = async () => {
        const students = await getCourseStudents(title, page, limit)
        setStudents(students)
    }

    const handleTransfer = () => {
        navigate(`/dashboard/courses/${title}/students/transfer`)
    }
    const handleExportToCsv = async () => {
        await exportStudentsToCsv(title)
    }

    useEffect(() => {
        loadStudents()
    }, [page])

    return (
        <FlexTableWrapper>
            <Flex
                className={'student-options'}
                justifyContent={'flex-end'}
                gap={5}
            >
                <NavigationButton onClick={handleTransfer}>
                    Transfer
                </NavigationButton>
                <AddButton onClick={handleExportToCsv}>Export to Csv</AddButton>
            </Flex>
            <ScrollableTable>
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Name</Th>
                        <Th textAlign={'center'}>Surname</Th>
                        <Th textAlign={'center'}>Index</Th>
                        <Th textAlign={'center'}>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {students.map((student) => (
                        <StudentTableItem
                            key={student.id}
                            student={student}
                            onDelete={() => handleDelete(student.id)}
                        />
                    ))}
                </Tbody>
            </ScrollableTable>
            <PaginationBar
                previousDisabled={page === 1}
                nextDisabled={students.length <= limit}
                onPrevious={() => previous()}
                onNext={() => next()}
            />
        </FlexTableWrapper>
    )
}
