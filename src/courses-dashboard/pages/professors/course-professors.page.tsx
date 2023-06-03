import { Flex, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { AddButton } from '../../components/shared/add-button'
import { SCROLL_HOVER_DEFAULT } from '../../../shared/utils/utils'
import { StudentTableItem } from '../../components/students/student-table-item.component'
import { PaginationBar } from '../../../shared/components/pagination-bar.component'
import { useAddProfessorToCourse } from '../../../api/courses/useAddProfessorToCourse'
import { useExportProfessorsToCsv } from '../../../api/courses/csv/useExportProfessorsToCsv'
import { usePagination } from '../../hooks/usePagination'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Professor } from '../../../users/model/professor.model'
import { useGetCourseProfessors } from '../../../api/courses/useGetCourseProfessors'
import { ProfessorTableItem } from '../../components/professors/professor-table-item.component'
import { useRemoveProfessorFromCourse } from '../../../api/courses/useRemoveProfessorFromCourse'
import { ScrollableTable } from '../../components/shared/scrollable-table'
import { FlexTableWrapper } from '../../components/shared/flex-table-wrapper.component'

export const CourseProfessorsPage = () => {
    const { title = '' } = useParams()
    const { page, next, previous, limit } = usePagination()
    const { exportProfessorsToCsv } = useExportProfessorsToCsv()
    const { getCourseProfessors } = useGetCourseProfessors()
    const { removeProfessorFromCourse } = useRemoveProfessorFromCourse()
    const [professors, setProfessors] = useState<Professor[]>([])
    const navigate = useNavigate()
    const handleAddProfessor = () => {
        navigate(`/dashboard/courses/${title}/professors/add`)
    }

    const handleExportToCsv = async () => {
        await exportProfessorsToCsv(title)
    }

    const loadProfessors = async () => {
        const professors = await getCourseProfessors(title, page, limit)
        setProfessors(professors)
    }

    const handleDelete = async (id: number) => {
        await removeProfessorFromCourse(title, id)
        await loadProfessors()
    }

    useEffect(() => {
        loadProfessors()
    }, [page])

    return (
        <FlexTableWrapper>
            <Flex
                className={'professor-options'}
                justifyContent={'flex-end'}
                gap={5}
            >
                <AddButton onClick={handleAddProfessor}>
                    Add Professor
                </AddButton>
                <AddButton onClick={handleExportToCsv}>Export to Csv</AddButton>
            </Flex>
            <ScrollableTable>
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Name</Th>
                        <Th textAlign={'center'}>Surname</Th>
                        <Th textAlign={'center'}>Title</Th>
                        <Th textAlign={'center'}>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {professors.map((professor) => (
                        <ProfessorTableItem
                            key={professor.id}
                            professor={professor}
                            onDelete={() => handleDelete(professor.id)}
                        />
                    ))}
                </Tbody>
            </ScrollableTable>
            <PaginationBar
                previousDisabled={page === 1}
                nextDisabled={professors.length <= limit}
                onPrevious={() => previous()}
                onNext={() => next()}
            />
        </FlexTableWrapper>
    )
}
