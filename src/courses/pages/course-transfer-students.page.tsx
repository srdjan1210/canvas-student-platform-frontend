import { Button, Flex, Heading, Input, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Student } from '../../users/model/student.model'
import { StudentDndContainer } from '../components/students/student-dnd-container.component'
import { useApplicationStore } from '../../store/application.store'
import { useParams } from 'react-router-dom'
import { useInfiniteScroll } from '../../shared/utils/infinite-scroll'
import { StudentsImportModalComponent } from '../components/students/students-import-modal.component'
import { UploadFileButton } from '../components/upload-file-button'
import { useGetStudentsWithoutGivenCourse } from '../../api/specialization/useGetStudentsWithoutGivenCourse'
import { useAddStudentsToCourse } from '../../api/courses/useAddStudentsToCourse'
import { useImportCourseStudents } from '../../api/courses/useImportCourseStudents'

export const CourseTransferStudentsPage = () => {
    const [studentsAttending, setStudentsAttending] = useState<Student[]>([])
    const [studentsNotAttending, setStudentsNotAttending] = useState<Student[]>(
        []
    )
    const [leftDrag, setLeftDrag] = useState<Student | null>(null)
    const [rightDrag, setRightDrag] = useState<Student | null>(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [paginationDisabled, setPaginationDisabled] = useState(false)
    const [parsedStudents, setParsedStudents] = useState<Student[]>([])
    const setSpinner = useApplicationStore((state) => state.setSpinner)
    const { getStudentsWithoutGivenCourse } = useGetStudentsWithoutGivenCourse()
    const { addStudentsToCourse } = useAddStudentsToCourse()
    const { importCourseStudents } = useImportCourseStudents()
    const { title } = useParams()
    const { onScroll, setLoading } = useInfiniteScroll(async () => {
        if (paginationDisabled) {
            setLoading(false)
            return
        }
        const loaded = await loadPaginated(search, page + 1)
        setPage(page + 1)
        setStudentsNotAttending([...studentsNotAttending, ...loaded])
        setLoading(false)
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    const loadPaginated = async (text: string, page: number) => {
        const students = await getStudentsWithoutGivenCourse(title, text, page)
        if (students.length == 0) setPaginationDisabled(true)
        return students.filter((s: Student) =>
            studentsAttending.every((st) => st.id != s.id)
        )
    }
    const loadStudents = async (text: string) => {
        setSpinner(true)
        const students = await getStudentsWithoutGivenCourse(title, text)
        const filtered = students.filter((s: Student) =>
            studentsAttending.every((st) => st.id != s.id)
        )
        setStudentsNotAttending(filtered)
        setSpinner(false)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            loadStudents(search)
            setPage(1)
            setPaginationDisabled(false)
        }
    }

    const handleLeftDrag = (student: Student) => {
        setLeftDrag(student)
    }
    const handleLeftDrop = () => {
        if (!rightDrag) return
        setStudentsAttending(
            studentsAttending.filter((s) => s.id != rightDrag.id)
        )
        setStudentsNotAttending([rightDrag, ...studentsNotAttending])
        setRightDrag(null)
    }

    const handleRightDrag = (student: Student) => {
        setRightDrag(student)
    }

    const handleLeftDragEnd = () => {
        setLeftDrag(null)
    }

    const handleRightDragEnd = () => {
        setRightDrag(null)
    }

    const handleRightDrop = () => {
        if (!leftDrag) return
        setStudentsNotAttending(
            studentsNotAttending.filter((s) => s.id != leftDrag.id)
        )
        setStudentsAttending([leftDrag, ...studentsAttending])
        setLeftDrag(null)
    }

    const importStudentsFromCsv = async (file: File | undefined) => {
        console.log(file)
        if (!file) return
        const students = await importCourseStudents(title ?? '', file)
        setParsedStudents(students)
    }

    const commit = async () => {
        const ids = studentsAttending.map((student) => student.id)
        await commitStudents(ids)
    }

    const commitStudents = async (ids: number[]) => {
        const resp = await addStudentsToCourse(title ?? '', ids)
        if (!resp.error) {
            setStudentsAttending([])
        }
    }

    const closeModal = async () => {
        onClose()
        const ids = parsedStudents.map((student) => student.id)
        await commitStudents(ids)
        setParsedStudents([])
        setStudentsNotAttending([])
        await loadStudents(search)
        setPage(1)
    }

    useEffect(() => {
        loadStudents(search)
    }, [])

    useEffect(() => {
        if (parsedStudents.length == 0) return
        onOpen()
    }, [parsedStudents])

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
                        Students not attending!
                    </Heading>
                    <Input
                        placeholder={'Search students...'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        size={'lg'}
                        w={'100%'}
                    />

                    <StudentDndContainer
                        students={studentsNotAttending}
                        onDrop={() => handleLeftDrop()}
                        onDragging={(student: Student) =>
                            handleLeftDrag(student)
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
                            Students attending!
                        </Heading>
                        <Flex gap={5}>
                            <UploadFileButton
                                text={'Import from csv!'}
                                onUpload={(file) => importStudentsFromCsv(file)}
                            />
                            {studentsAttending.length > 0 && (
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
                    <StudentDndContainer
                        students={studentsAttending}
                        onDrop={() => handleRightDrop()}
                        onDragging={(student: Student) =>
                            handleRightDrag(student)
                        }
                        dragged={leftDrag}
                        onDraggingEnd={() => handleRightDragEnd()}
                        minW={600}
                        flex={1}
                    />
                </Flex>
            </Flex>
            <StudentsImportModalComponent
                students={parsedStudents}
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={() => closeModal()}
            />
        </Flex>
    )
}
