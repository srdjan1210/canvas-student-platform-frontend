import { Student } from '../../../users/model/student.model'
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
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
            <ModalContent w={'80%'} h={'80%'}>
                <ModalCloseButton />
                <ModalHeader>Parsed Students</ModalHeader>
                <ModalBody overflowY={'scroll'}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        {students.map((student) => (
                            <Flex
                                key={student.id}
                                alignItems={'center'}
                                justifyContent={'flex-start'}
                                borderBottom={'1px solid lightgray'}
                                paddingLeft={'5px'}
                                h={'100px'}
                            >
                                <Text fontSize={'20px'}>
                                    {`${student.name} ${student.surname}(${student.fullIndex}`}
                                    )
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="green"
                        mr={3}
                        onClick={() => onConfirm()}
                    >
                        Commit
                    </Button>
                    <Button variant="ghost" onClick={() => onClose()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
