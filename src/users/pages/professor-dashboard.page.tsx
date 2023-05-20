import { useEffect, useState } from 'react'
import { useApplicationStore } from '../../store/application.store'
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
import { SearchAndCommand } from '../components/search-and-command.component'
import { PaginationBar } from '../../shared/components/pagination-bar.component'
import { Professor } from '../model/professor.model'
import {
    AddProfessorModal,
    FormValues,
} from '../components/add-professor-modal.component'
import ProfessorTableItemComponent from '../components/professor-table-item.component'
import { useSearchProfessors } from '../../api/specialization/useSearchProfessors'
import { useRegisterProfessor } from '../../api/specialization/useRegisterProfessor'

export const ProfessorDashboardPage = () => {
    const [professors, setProfessors] = useState<Professor[]>([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selected, setSelected] = useState<number[]>([])
    const spinner = useApplicationStore((state) => state.spinner)
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { searchProfessors } = useSearchProfessors()
    const { registerProfessor } = useRegisterProfessor()

    const handleSelectChange = (val: number) => {
        const isSelected = selected.some((sel) => sel === val)
        if (!isSelected) setSelected([...selected, val])
        else setSelected(selected.filter((sel) => sel != val))
    }

    const loadPaginated = async (page: number) => {
        setSpinner(true)
        const professors = await searchProfessors(search, page, perPage)
        setProfessors(professors)
        setSpinner(false)
        setPage(page)
    }

    const loadSearchedProfessors = async () => {
        setSpinner(true)
        const professors = await searchProfessors(search, page, perPage)
        setProfessors(professors)
        setSpinner(false)
        setPage(1)
    }

    const handleAddProfessor = () => {
        onOpen()
    }

    const handleRegister = async ({
        email,
        name,
        surname,
        password,
        title,
    }: FormValues) => {
        onClose()
        await registerProfessor({
            email,
            name,
            surname,
            password,
            title,
        })
        await loadPaginated(page)
    }

    useEffect(() => {
        loadSearchedProfessors()
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
                    placeholder={'Search professors by name, surname or title'}
                    showCommands={true}
                >
                    <Button
                        background={'green'}
                        color={'white'}
                        onClick={handleAddProfessor}
                    >
                        Add Professor
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
                                <Th textAlign={'center'}>Title</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {professors.map((professor) => (
                                <ProfessorTableItemComponent
                                    key={professor.id}
                                    professor={professor}
                                    isSelected={selected.some(
                                        (sel) => sel === professor.id
                                    )}
                                    onSelectChange={() =>
                                        handleSelectChange(professor.id)
                                    }
                                />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <PaginationBar
                    previousDisabled={page <= 1}
                    nextDisabled={professors.length == 0}
                    onPrevious={() => loadPaginated(page - 1)}
                    onNext={() => loadPaginated(page + 1)}
                />
            </Flex>
            <AddProfessorModal
                isOpen={isOpen}
                onClose={onClose}
                onRegister={handleRegister}
            />
        </Flex>
    )
}
