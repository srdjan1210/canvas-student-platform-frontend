import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export interface Props {
    course: string
}
export const AdminCourseOptions = ({ course }: Props) => {
    return (
        <Menu>
            <MenuButton as={Button} color={'white'} background={'green'}>
                Options
            </MenuButton>
            <MenuList>
                <MenuItem>
                    <Link to={`/dashboard/courses/${course}/add/students`}>
                        Add students to course
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={`/dashboard/courses/${course}/add/professors`}>
                        Add professors to course
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={`/dashboard/courses/${course}/list/students`}>
                        List students
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={`/dashboard/courses/${course}/list/professors`}>
                        List professors
                    </Link>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
