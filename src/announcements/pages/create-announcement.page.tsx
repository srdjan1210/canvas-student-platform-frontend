import { Button, Flex, Input, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import React from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../css/editor.css'
import { convertToHTML } from 'draft-convert'
import { CreateAnnouncement } from '../types/create-announcement.type'
import { toast } from 'react-toastify'
import { useCreateAnnouncement } from '../../api/announcements/useCreateAnnouncement'
import { Course } from '../../courses-dashboard/model/course.model'
import { useGetProfessorCourses } from '../../api/courses/useGetProfessorCourses'
import { useGetAllCourses } from '../../api/courses/useGetAllCourses'
import { useApplicationStore } from '../../store/application.store'
export const CreateAnnouncementPage = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    )
    const [title, setTitle] = useState('')
    const [availableCourses, setAvailableCourses] = useState<Course[]>([])
    const [courseSelected, setCourseSelected] = useState<string>('')
    const user = useApplicationStore((state) => state.user)
    const { createAnnouncement } = useCreateAnnouncement()
    const { getProfessorCourses } = useGetProfessorCourses()
    const { getAllCourses } = useGetAllCourses()
    const handleSaveContent = async () => {
        const body = convertToHTML(editorState.getCurrentContent())
        const data: CreateAnnouncement = {
            title,
            body,
            course: courseSelected,
        }

        if (courseSelected.trim() === '') {
            toast.error('Course should be selected!', {
                position: 'bottom-right',
            })
            return
        }

        if (title.trim() === '' || body.trim() === '') {
            toast.error('Title and body should not be empty', {
                position: 'bottom-right',
            })
            return
        }

        const ok = await createAnnouncement(data)
        if (!ok) return
        setEditorState(() => EditorState.createEmpty())
        setTitle('')
    }

    const loadCourses = async () => {
        let courses = []
        if (user?.role === 'ADMINISTRATOR') {
            courses = await getAllCourses()
        } else if (user?.role === 'PROFESSOR') {
            courses = await getProfessorCourses()
        }
        setAvailableCourses(courses)
    }

    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <Flex
            w={'100%'}
            h={'100%'}
            position={'relative'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Flex
                className={'inner'}
                w={'60%'}
                direction={'column'}
                gap={5}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Select
                    value={courseSelected}
                    onChange={(e) => setCourseSelected(e.target.value)}
                >
                    <option value="">Select Course</option>
                    {availableCourses.map((course) => (
                        <option key={course.id} value={course.title}>
                            {course.title}
                        </option>
                    ))}
                </Select>
                <Input
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                    placeholder={'Type in announcement header...'}
                />
                <Flex w={'100%'}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        placeholder={'Type in content of announcement...'}
                    />
                </Flex>
                <Flex justifyContent={'flex-end'} w={'100%'}>
                    <Button
                        color={'white'}
                        background={'green'}
                        onClick={handleSaveContent}
                    >
                        Save content
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
