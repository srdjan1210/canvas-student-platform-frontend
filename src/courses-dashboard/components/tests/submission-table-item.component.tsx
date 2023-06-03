import { StudentTestScore } from '../../../api/courses/types/student-test-score'
import { useEffect, useState } from 'react'
import {
    Box,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Td,
    Tr,
} from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'

export interface Props {
    submission: StudentTestScore
    onPointsEdited: (points: number) => void
}
export const SubmissionTableItem = ({ submission, onPointsEdited }: Props) => {
    const [points, setPoints] = useState<number>(submission.points ?? 0)
    const [lastPoints, setLastPoints] = useState<number>(submission.points ?? 0)
    const [pointsEditable, setPointsEditable] = useState(false)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            setPointsEditable(false)
            setLastPoints(points)
            onPointsEdited(points)
        }
    }

    const handleStartEditing = () => {
        setPointsEditable(true)
        setLastPoints(points)
    }

    const handleCancelEdit = () => {
        setPointsEditable(false)
        setPoints(lastPoints)
    }
    return (
        <Tr>
            <Td textAlign={'center'}>{submission.name}</Td>
            <Td textAlign={'center'}>{submission.surname}</Td>
            <Td textAlign={'center'}>{submission.fullIndex}</Td>
            <Td textAlign={'center'}>
                {pointsEditable ? (
                    <InputGroup size="sm" maxW={'150px'} margin={'auto'}>
                        <Input
                            type={'number'}
                            value={points}
                            onChange={(e) =>
                                setPoints(+(e.target.value ?? '0'))
                            }
                            onKeyDown={handleKeyDown}
                        />
                        <InputRightElement width="4.5rem">
                            <MdOutlineCancel
                                size={20}
                                onClick={handleCancelEdit}
                                cursor={'pointer'}
                            />
                        </InputRightElement>
                    </InputGroup>
                ) : (
                    <>
                        <HStack justifyContent={'center'}>
                            <Box>{points ?? 0}</Box>
                            <FiEdit2
                                onClick={handleStartEditing}
                                cursor={'pointer'}
                            />
                        </HStack>
                    </>
                )}
            </Td>
            <Td textAlign={'center'}>
                {submission.fileUrl ? (
                    <Link download href={submission.fileUrl}>
                        Download
                    </Link>
                ) : (
                    'No submission'
                )}
            </Td>
        </Tr>
    )
}
