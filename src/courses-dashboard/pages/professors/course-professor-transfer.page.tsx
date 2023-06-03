import {
    Checkbox,
    Flex,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Professor } from '../../../users/model/professor.model'
import { FlexTableWrapper } from '../../components/shared/flex-table-wrapper.component'
import { ScrollableTable } from '../../components/shared/scrollable-table'
import { PaginationBar } from '../../../shared/components/pagination-bar.component'
import { ProfessorTransferTableItem } from '../../components/professors/professor-transfer-table-item.component'
import { usePagination } from '../../hooks/usePagination'
import { useGetProfessorsWithGivenCourse } from '../../../api/specialization/useGetProfessorsWithGivenCourse'
import { useAddProfessorToCourse } from '../../../api/courses/useAddProfessorToCourse'
import { useParams } from 'react-router-dom'
import { AddButton } from '../../components/shared/add-button'
import { ProfessorsImportModalComponent } from '../../components/professors/professors-import-modal.component'
import { useImportCourseProfessors } from '../../../api/courses/csv/useImportCourseProfessors'
import { UploadFileButton } from '../../components/shared/upload-file-button'
import { UploadFileButtonNoStyle } from '../../components/shared/upload-file-button-no-style'

export const CourseProfessorTransferPage = () => {
    const { title = '' } = useParams()
    const [professors, setProfessors] = useState<Professor[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const [parsedProfessors, setParsedProfessors] = useState<Professor[]>([])
    const { page, limit, next, previous, reset } = usePagination()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { getProfessorsWithGivenCourse } = useGetProfessorsWithGivenCourse()
    const { addProfessorsToCourse } = useAddProfessorToCourse()
    const { importCourseProfessors } = useImportCourseProfessors()
    const isAllChecked = selected.length === professors.length

    const loadProfessors = async () => {
        const professors = await getProfessorsWithGivenCourse(
            title,
            '',
            page,
            limit
        )
        setProfessors(professors)
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
        await addProfessorsToCourse(title, ids)
        setSelected([])
        await loadProfessors()
    }

    const importProfessorsFromCsv = async (file: File | undefined) => {
        console.log(file)
        if (!file) return
        const professors = await importCourseProfessors(title, file)
        setParsedProfessors(professors)
    }

    const closeModal = async () => {
        onClose()
        const ids = parsedProfessors.map((prof) => prof.id)
        await commitProfessors(ids)
        setParsedProfessors([])
        setSelected([])
        reset()
    }

    const handleSelectAll = () => {
        if (isAllChecked) {
            setSelected([])
            return
        }
        setSelected(professors.map((professor) => professor.id))
    }

    useEffect(() => {
        loadProfessors()
    }, [page])

    useEffect(() => {
        if (parsedProfessors.length == 0) return
        onOpen()
    }, [parsedProfessors])

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
                        <Th textAlign={'center'}>Title</Th>
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
                    {professors.map((professor) => (
                        <ProfessorTransferTableItem
                            key={professor.id}
                            professor={professor}
                            isSelected={selected.includes(professor.id)}
                            onSelected={() => handleSelection(professor.id)}
                        />
                    ))}
                </Tbody>
            </ScrollableTable>
            <PaginationBar
                previousDisabled={page === 1}
                nextDisabled={professors.length < limit}
                onPrevious={() => previous()}
                onNext={() => next()}
            />
            <ProfessorsImportModalComponent
                professors={parsedProfessors}
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={() => closeModal()}
            />
        </FlexTableWrapper>
    )
}
