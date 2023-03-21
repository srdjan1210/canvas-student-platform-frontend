import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApplicationStore } from '../../store/application.store'
import useCourseService from '../services/course.service'
import {
    Flex,
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
    const { getCourseProfessors } = useCourseService()

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

    useEffect(() => {
        loadProfessors()
    }, [])
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
                                    isSelected={false}
                                    onSelectChange={() => {}}
                                    professor={professor}
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
