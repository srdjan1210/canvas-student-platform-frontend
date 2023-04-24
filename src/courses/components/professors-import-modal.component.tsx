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
import { Professor } from '../../users/model/professor.model'

interface Props {
    professors: Professor[]
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}
export const ProfessorsImportModalComponent = ({
    professors,
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
                    {professors.map((professor) => (
                        <Flex key={professor.id}>
                            {`${professor.name} ${professor.surname} ${professor.title}`}
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
