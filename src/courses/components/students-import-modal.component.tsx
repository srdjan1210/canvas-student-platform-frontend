import { Student } from '../../users/model/student.model'
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react'

interface Props {
    students: Student[]
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}
export const StudentsImportModalComponent = ({
    students,
    isOpen,
    onClose,
    onConfirm,
}: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    {students.map((student) => (
                        <Flex key={student.id}>
                            {`${student.name} ${student.surname} ${student.fullIndex}`}
                        </Flex>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="green"
                        mr={3}
                        onClick={() => onConfirm()}
                    >
                        Ok
                    </Button>
                    <Button variant="ghost" onClick={() => onClose()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
