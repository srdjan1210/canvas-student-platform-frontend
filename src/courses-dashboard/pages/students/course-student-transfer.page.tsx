import {
    Checkbox,
    Flex,
    Tbody,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FlexTableWrapper } from '../../components/shared/flex-table-wrapper.component'
import { ScrollableTable } from '../../components/shared/scrollable-table'
import { PaginationBar } from '../../../shared/components/pagination-bar.component'
import { usePagination } from '../../hooks/usePagination'
import { useParams } from 'react-router-dom'
import { AddButton } from '../../components/shared/add-button'
import { UploadFileButtonNoStyle } from '../../components/shared/upload-file-button-no-style'
import { StudentsImportModalComponent } from '../../components/students/students-import-modal.component'
import { useGetStudentsWithoutGivenCourse } from '../../../api/specialization/useGetStudentsWithoutGivenCourse'
import { useAddStudentsToCourse } from '../../../api/courses/useAddStudentsToCourse'
import { useImportCourseStudents } from '../../../api/courses/csv/useImportCourseStudents'
import { Student } from '../../../users/model/student.model'
import { StudentTransferTableItem } from '../../components/students/student-transfer-table-item.component'

export const CourseStudentTransferPage = () => {
    const { title = '' } = useParams()
    const [students, setStudents] = useState<Student[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const [parsedStudents, setParsedStudents] = useState<Student[]>([])
    const { page, limit, next, previous, reset } = usePagination()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getStudentsWithoutGivenCourse } = useGetStudentsWithoutGivenCourse()
    const { addStudentsToCourse } = useAddStudentsToCourse()
    const { importCourseStudents } = useImportCourseStudents()
    const isAllChecked = selected.length === students.length

    const loadStudents = async () => {
        const students = await getStudentsWithoutGivenCourse(
            title,
            '',
            page,
            limit
        )
        setStudents(students)
    }

    const handleSelection = (id: number) => {
        const exists = selected.includes(id)
        if (!exists) {
            setSelected([...selected, id])
            return
        }
        console.log('filtering')
        const newSelected = selected.filter((sel) => sel != id)
        setSelected(newSelected)
    }

    const handleCommit = async () => {
        await commitProfessors(selected)
    }

    const commitProfessors = async (ids: number[]) => {
        await addStudentsToCourse(title, ids)
        setSelected([])
        await loadStudents()
    }

    const importProfessorsFromCsv = async (file: File | undefined) => {
        console.log(file)
        if (!file) return
        const professors = await importCourseStudents(title, file)
        setParsedStudents(professors)
    }

    const closeModal = async () => {
        onClose()
        const ids = parsedStudents.map((prof) => prof.id)
        await commitProfessors(ids)
        setParsedStudents([])
        setSelected([])
        reset()
    }

    const handleSelectAll = () => {
        if (isAllChecked) {
            setSelected([])
            return
        }
        setSelected(students.map((professor) => professor.id))
    }

    useEffect(() => {
        loadStudents()
    }, [page])

    useEffect(() => {
        if (parsedStudents.length == 0) return
        onOpen()
    }, [parsedStudents])

    return (
        <FlexTableWrapper>
            <Flex w={'100%'} justifyContent={'flex-end'} gap={5}>
                {selected.length > 0 && (
                    <AddButton onClick={handleCommit}>
                        Commit selected({selected.length})
                    </AddButton>
                )}
                <UploadFileButtonNoStyle
                    id={'transfer-upload'}
                    onUploadFile={(file) => importProfessorsFromCsv(file)}
                    disabled={false}
                >
                    Import From Csv
                </UploadFileButtonNoStyle>
            </Flex>
            <ScrollableTable>
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Name</Th>
                        <Th textAlign={'center'}>Surname</Th>
                        <Th textAlign={'center'}>Index</Th>
                        <Th textAlign={'center'}>
                            <span style={{ padding: '0px 5px' }}>
                                Select All
                            </span>
                            <Checkbox
                                isChecked={isAllChecked}
                                onChange={handleSelectAll}
                            />
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {students.map((student) => (
                        <StudentTransferTableItem
                            key={student.id}
                            student={student}
                            isSelected={selected.includes(student.id)}
                            onSelected={() => handleSelection(student.id)}
                        />
                    ))}
                </Tbody>
            </ScrollableTable>
            <PaginationBar
                previousDisabled={page === 1}
                nextDisabled={students.length < limit}
                onPrevious={() => previous()}
                onNext={() => next()}
            />
            <StudentsImportModalComponent
                students={parsedStudents}
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={() => closeModal()}
            />
        </FlexTableWrapper>
    )
}
