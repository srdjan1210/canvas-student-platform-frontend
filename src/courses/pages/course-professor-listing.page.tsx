import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApplicationStore } from '../../store/application.store'
import useCourseService from '../services/course.service'
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
import { PaginationBar } from '../../shared/components/pagination-bar.component'
import { GlobalSpinner } from '../../shared/components/spinner.component'
import { Professor } from '../../users/model/professor.model'
import ProfessorTableItemComponent from '../../users/components/professor-table-item.component'

export const CourseProfessorListingPage = () => {
    const { title } = useParams()
    const [page, setPage] = useState(1)
    const [professors, setProfessors] = useState<Professor[]>([])
    const spinner = useApplicationStore((state) => state.spinner)
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const navigate = useNavigate()
    const {
        getCourseProfessors,
        exportProfessorsToCsv,
        removeProfessorFromCourse,
    } = useCourseService()

    const loadProfessors = async (page = 1) => {
        setSpinner(true)
        const professors = await getCourseProfessors(title ?? '', page)
        setSpinner(false)
        setProfessors(professors)
    }
    const loadPaginated = async (page: number) => {
        await loadProfessors(page)
        setPage(page)
    }

    const handleRemoveProfessor = async (professor: Professor) => {
        await removeProfessorFromCourse(title ?? '', professor.id)
        await loadPaginated(page)
    }

    const handleAddProfessors = () => {
        navigate(`/dashboard/courses/${title}/add/professors`)
    }

    useEffect(() => {
        loadProfessors()
    }, [])
    return (
        <Flex
            w={'100%'}
            justifyContent={'center'}
            h={'100%'}
            position={'relative'}
            direction={'column'}
            alignItems={'center'}
        >
            <Flex
                h={'100%'}
                w={'80%'}
                direction={'column'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                paddingBottom={10}
                gap={10}
            >
                <Flex
                    w={'100%'}
                    justifyContent={'space-between'}
                    paddingTop={'40px'}
                    alignItems={'center'}
                >
                    <Heading as={'h2'} fontSize={'1.5rem'}>
                        {title}(Professors)
                    </Heading>
                    <Flex gap={5}>
                        <Button
                            color={'white'}
                            background={'green'}
                            onClick={handleAddProfessors}
                        >
                            AddProfessors
                        </Button>
                        <Button
                            color={'white'}
                            background={'green'}
                            onClick={() => exportProfessorsToCsv(title ?? '')}
                        >
                            Export to CSV
                        </Button>
                    </Flex>
                </Flex>
                <TableContainer w={'100%'} h={'100%'}>
                    <Table
                        css={{ 'table-layout': 'fixed', width: 'full' }}
                        variant={'simple'}
                    >
                        <Thead>
                            <Tr>
                                <Th textAlign={'center'}>Name</Th>
                                <Th textAlign={'center'}>Surname</Th>
                                <Th textAlign={'center'}>Title</Th>
                                <Th textAlign={'center'}>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {professors.map((professor) => (
                                <ProfessorTableItemComponent
                                    key={professor.id}
                                    isSelected={false}
                                    onSelectChange={() => {}}
                                    professor={professor}
                                    onRemove={() =>
                                        handleRemoveProfessor(professor)
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
            <GlobalSpinner spinner={spinner} />
        </Flex>
    )
}
