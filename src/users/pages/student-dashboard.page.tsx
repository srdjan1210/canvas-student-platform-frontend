import { useEffect, useState } from 'react'
import { Student } from '../model/student.model'
import {
    Button,
    Checkbox,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import StudentTableItem from '../components/student-table-item.component'
import { useStudentService } from '../services/student.service'
import { useApplicationStore } from '../../store/application.store'
import { GlobalSpinner } from '../../shared/components/spinner.component'
import { SearchAndCommand } from '../components/search-and-command.component'
import { PaginationBar } from '../../shared/components/pagination-bar.component'

export const StudentDashboardPage = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selected, setSelected] = useState<number[]>([])
    const [allSelected, setAllSelected] = useState(false)
    const spinner = useApplicationStore((state) => state.spinner)
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const { searchStudents } = useStudentService()

    const handleAllSelected = (e: any) => {
        if (!e.target.checked) {
            setAllSelected(false)
            setSelected([])
            return
        }
        setAllSelected(true)
        setSelected(students.map((student) => student.id))
    }

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

    useEffect(() => {
        loadSearchedStudents()
    }, [search])

    useEffect(() => {
        const studentIds = students.map((student) => student.id).sort()
        const selectedSorted = selected.sort()
        if (studentIds.every((s, index) => s === selectedSorted[index])) {
            setAllSelected(true)
        } else {
            setAllSelected(false)
        }
    }, [selected, students])

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
                    showCommands={selected.length > 0}
                >
                    <Button
                        onClick={() => setPage(page + 1)}
                        isDisabled={students.length === 0}
                        background={'green'}
                        color={'white'}
                    >
                        Next
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
                                <Th textAlign={'center'}>
                                    <Checkbox
                                        isChecked={allSelected}
                                        onChange={handleAllSelected}
                                    >
                                        Select All
                                    </Checkbox>
                                </Th>
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
            <GlobalSpinner spinner={spinner} />
        </Flex>
    )
}
