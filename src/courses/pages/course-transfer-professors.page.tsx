import { useEffect, useState } from 'react'
import { useApplicationStore } from '../../store/application.store'
import { useParams } from 'react-router-dom'
import { useInfiniteScroll } from '../../shared/utils/infinite-scroll'
import { Button, Flex, Heading, Input, useDisclosure } from '@chakra-ui/react'
import { Professor } from '../../users/model/professor.model'
import { ProfessorDndContainer } from '../components/professors/professor-dnd-container.component'
import { UploadFileButton } from '../components/upload-file-button'
import { ProfessorsImportModalComponent } from '../components/professors/professors-import-modal.component'
import { useGetProfessorsWithGivenCourse } from '../../api/specialization/useGetProfessorsWithGivenCourse'
import { useAddProfessorToCourse } from '../../api/courses/useAddProfessorToCourse'
import { useImportCourseProfessors } from '../../api/courses/useImportCourseProfessors'

export const CourseTransferProfessorsPage = () => {
    const [professorsMembers, setProfessorsMembers] = useState<Professor[]>([])
    const [professorsNotMembers, setProfessorsNotMembers] = useState<
        Professor[]
    >([])
    const [leftDrag, setLeftDrag] = useState<Professor | null>(null)
    const [rightDrag, setRightDrag] = useState<Professor | null>(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [paginationDisabled, setPaginationDisabled] = useState(false)
    const [parsedProfessors, setParsedProfessors] = useState<Professor[]>([])
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const { getProfessorsWithGivenCourse } = useGetProfessorsWithGivenCourse()
    const { addProfessorsToCourse } = useAddProfessorToCourse()
    const { importCourseProfessors } = useImportCourseProfessors()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { title } = useParams()
    const { onScroll, setLoading } = useInfiniteScroll(async () => {
        if (paginationDisabled) {
            setLoading(false)
            return
        }
        const loaded = await loadPaginated(search, page + 1)
        setPage(page + 1)
        setProfessorsNotMembers([...professorsNotMembers, ...loaded])
        setLoading(false)
    })

    const loadPaginated = async (text: string, page: number) => {
        const professors = await getProfessorsWithGivenCourse(title, text, page)
        if (professors.length == 0) setPaginationDisabled(true)
        return professors.filter((prof: Professor) =>
            professorsMembers.every((p) => p.id != prof.id)
        )
    }
    const loadProfessors = async (text: string) => {
        setSpinner(true)
        const professors = await getProfessorsWithGivenCourse(title, text)
        console.log(professors)
        const filtered = professors.filter((prof: Professor) =>
            professorsMembers.every((p: any) => p.id != prof.id)
        )
        setProfessorsNotMembers(filtered)
        setSpinner(false)
    }

    const handleKeyDown = async (e: any) => {
        if (e.key === 'Enter') {
            await loadProfessors(search)
            setPage(1)
            setPaginationDisabled(false)
        }
    }

    const handleLeftDrag = (professor: Professor) => {
        setLeftDrag(professor)
    }
    const handleLeftDrop = () => {
        if (!rightDrag) return
        setProfessorsMembers(
            professorsMembers.filter((p) => p.id != rightDrag.id)
        )
        setProfessorsNotMembers([rightDrag, ...professorsNotMembers])
        setRightDrag(null)
    }

    const handleRightDrag = (professor: Professor) => {
        setRightDrag(professor)
    }

    const handleLeftDragEnd = () => {
        setLeftDrag(null)
    }

    const handleRightDragEnd = () => {
        setRightDrag(null)
    }

    const handleRightDrop = () => {
        if (!leftDrag) return
        setProfessorsNotMembers(
            professorsNotMembers.filter((p) => p.id != leftDrag.id)
        )
        setProfessorsMembers([leftDrag, ...professorsMembers])
        setLeftDrag(null)
    }

    const importProfessorsFromCsv = async (file: File | undefined) => {
        console.log(file)
        if (!file) return
        const professors = await importCourseProfessors(title ?? '', file)
        setParsedProfessors(professors)
    }

    const commit = async () => {
        const ids = professorsMembers.map((professor) => professor.id)
        await commitProfessors(ids)
    }

    const commitProfessors = async (ids: number[]) => {
        const resp = await addProfessorsToCourse(title ?? '', ids)
        if (!resp.error) {
            setProfessorsMembers([])
        }
    }

    const closeModal = async () => {
        onClose()
        const ids = parsedProfessors.map((prof) => prof.id)
        await commitProfessors(ids)
        setParsedProfessors([])
        setProfessorsMembers([])
        await loadProfessors(search)
        setPage(1)
    }

    useEffect(() => {
        loadProfessors(search)
    }, [])

    useEffect(() => {
        if (parsedProfessors.length == 0) return
        onOpen()
    }, [parsedProfessors])

    return (
        <Flex
            w={'100%'}
            maxH={'100%'}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            direction={'column'}
            position={'relative'}
            className={'container'}
        >
            <Flex alignItems={'center'} justifyContent={'center'} w={'100%'}>
                <Heading as={'h1'}>{title}</Heading>
            </Flex>

            <Flex
                w={'100%'}
                flex={1}
                alignItems={'center'}
                justifyContent={'space-evenly'}
            >
                <Flex direction={'column'} gap={5} h={'80%'}>
                    <Heading as={'h1'} fontSize={'1.2rem'}>
                        Professors not members!
                    </Heading>
                    <Input
                        placeholder={'Search professors...'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        size={'lg'}
                        w={'100%'}
                    />

                    <ProfessorDndContainer
                        professors={professorsNotMembers}
                        onDrop={() => handleLeftDrop()}
                        onDragging={(professor: Professor) =>
                            handleLeftDrag(professor)
                        }
                        dragged={rightDrag}
                        onDraggingEnd={() => handleLeftDragEnd()}
                        minW={600}
                        onScroll={onScroll}
                        flex={1}
                    />
                </Flex>
                <Flex direction={'column'} gap={5} h={'80%'}>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Heading as={'h1'} fontSize={'1.2rem'}>
                            Professors members!
                        </Heading>
                        <Flex gap={5}>
                            <UploadFileButton
                                text={'Import from csv!'}
                                onUpload={(file) =>
                                    importProfessorsFromCsv(file)
                                }
                            />

                            {professorsMembers.length > 0 && (
                                <Button
                                    onClick={() => commit()}
                                    background={'green'}
                                    color={'white'}
                                >
                                    Commit
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                    <ProfessorDndContainer
                        professors={professorsMembers}
                        onDrop={() => handleRightDrop()}
                        onDragging={(professor: Professor) =>
                            handleRightDrag(professor)
                        }
                        dragged={leftDrag}
                        onDraggingEnd={() => handleRightDragEnd()}
                        minW={600}
                        flex={1}
                    />
                </Flex>
            </Flex>
            <ProfessorsImportModalComponent
                professors={parsedProfessors}
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={() => closeModal()}
            />
        </Flex>
    )
}
