import { useEffect, useState } from 'react'
import { Student } from '../model/student.model'
import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import StudentTableItem from '../components/student-table-item.component'
import { useApplicationStore } from '../../store/application.store'
import { SearchAndCommand } from '../components/search-and-command.component'
import { PaginationBar } from '../../shared/components/pagination-bar.component'
import {
    AddStudentModal,
    FormValues,
} from '../components/add-student.modal.component'
import { useSearchStudents } from '../../api/specialization/useSearchStudents'
import { useRegisterStudent } from '../../api/specialization/useRegisterStudent'

export const StudentDashboardPage = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selected, setSelected] = useState<number[]>([])
    const spinner = useApplicationStore((state) => state.spinner)
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { searchStudents } = useSearchStudents()
    const { registerStudent } = useRegisterStudent()

    const handleSelectChange = (val: number) => {
        const isSelected = selected.some((sel) => sel === val)
        if (!isSelected) setSelected([...selected, val])
        else setSelected(selected.filter((sel) => sel != val))
    }

    const loadPaginated = async (page: number) => {
        setSpinner(true)
        const students = await searchStudents(search, page, perPage)
        setStudents(students)
        setSpinner(false)
        setPage(page)
    }

    const loadSearchedStudents = async () => {
        setSpinner(true)
        const students = await searchStudents(search, page, perPage)
        setStudents(students)
        setSpinner(false)
        setPage(1)
    }

    const handleAddStudent = () => {
        onOpen()
    }

    const handleRegister = async ({
        email,
        specialization,
        name,
        surname,
        password,
        indexNumber,
        indexYear,
    }: FormValues) => {
        onClose()
        await registerStudent({
            email,
            specialization,
            surname,
            password,
            indexNumber,
            year: indexYear,
            name,
        })
        await loadPaginated(page)
    }

    useEffect(() => {
        loadSearchedStudents()
    }, [search])

    return (
        <Flex
            w={'100%'}
            justifyContent={'center'}
            h={'100%'}
            position={'relative'}
        >
            <Flex
                h={'100%'}
                w={'80%'}
                direction={'column'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                paddingTop={10}
                paddingBottom={10}
            >
                <SearchAndCommand
                    onChange={(text) => setSearch(text)}
                    placeholder={'Search students by name, surname or index'}
                    showCommands={true}
                >
                    <Button
                        background={'green'}
                        color={'white'}
                        onClick={handleAddStudent}
                    >
                        Add Student
                    </Button>
                </SearchAndCommand>

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
                                    isSelected={selected.some(
                                        (sel) => sel === student.id
                                    )}
                                    onSelectChange={() =>
                                        handleSelectChange(student.id)
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
            <AddStudentModal
                isOpen={isOpen}
                onClose={onClose}
                onRegister={handleRegister}
            />
        </Flex>
    )
}
