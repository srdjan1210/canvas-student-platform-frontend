import { Button, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../css/editor.css'
import { convertToHTML } from 'draft-convert'
import { useParams } from 'react-router-dom'
import { CreateAnnouncement } from '../types/create-announcement.type'
import { toast } from 'react-toastify'
import { useCreateAnnouncement } from '../../api/announcements/useCreateAnnouncement'
export const CreateAnnouncementPage = () => {
    const { course } = useParams()
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    )
    const [title, setTitle] = useState('')
    const { createAnnouncement } = useCreateAnnouncement()

    const handleSaveContent = async () => {
        const body = convertToHTML(editorState.getCurrentContent())
        const data: CreateAnnouncement = {
            title,
            body,
            course: course ?? '',
        }

        if (title.trim() === '' || body.trim() === '') {
            toast.error('Title and body should not be empty')
            return
        }

        const ok = await createAnnouncement(data)
        if (!ok) return
        setEditorState(() => EditorState.createEmpty())
        setTitle('')
    }

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
