import { Flex, Input, Text, Tooltip } from '@chakra-ui/react'
import { useApplicationStore } from '../../../store/application.store'
import { AdminCourseOptions } from '../admin/admin-course.options.component'
import { FileBoxSwitch } from './file-box-switch.component'
import { ProfessorFileOptions } from './professor-file-options.component'

interface Props {
    path?: string
    onCreateFolder: (folder: string) => void
    onUploadFile: (file: File | null) => void
    onCreateAnnouncement: () => void
    course: string
    search: string
    onSearch: (text: string) => void
}
export const FileSearchBar = ({
    path,
    onCreateFolder,
    onUploadFile,
    onCreateAnnouncement,
    course,
    search,
    onSearch,
}: Props) => {
    const user = useApplicationStore((state) => state.user)
    const handleSearch = (e: any) => {
        onSearch(e.target.value)
    }
    return (
        <Flex
            w={'100%'}
            justifyContent={
                user?.role === 'PROFESSOR' ? 'space-between' : 'center'
            }
            alignItems={'center'}
            minH={100}
            position={'relative'}
            flexWrap={'wrap'}
        >
            <Tooltip label={path}>
                <Text
                    fontSize={'1.4em'}
                    fontWeight={'bold'}
                    justifySelf={'flex-start'}
                    position={
                        user?.role === 'PROFESSOR' ? 'static' : 'absolute'
                    }
                    left={'0'}
                    minW={200}
                    maxW={200}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                    whiteSpace={'nowrap'}
                >
                    {path}
                </Text>
            </Tooltip>
            <Flex gap={10} alignItems={'center'}>
                <Input
                    placeholder={'Search files'}
                    w={250}
                    size={'lg'}
                    value={search}
                    onChange={handleSearch}
                />
                <FileBoxSwitch />
            </Flex>
            {user?.role === 'PROFESSOR' && (
                <ProfessorFileOptions
                    onCreateFolder={onCreateFolder}
                    onUploadFile={onUploadFile}
                    onCreateAnnouncement={onCreateAnnouncement}
                />
            )}
            {user?.role === 'ADMINISTRATOR' && (
                <AdminCourseOptions course={course} />
            )}
        </Flex>
    )
}
