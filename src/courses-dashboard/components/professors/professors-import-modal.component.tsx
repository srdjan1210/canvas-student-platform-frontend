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
import { Professor } from '../../../users/model/professor.model'

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
            <ModalContent w={'80%'} h={'80%'}>
                <ModalCloseButton />
                <ModalHeader>Parsed professors</ModalHeader>
                <ModalBody overflowY={'scroll'}>
                    <Flex direction={'column'} w={'100%'} h={'100%'}>
                        {professors.map((professor) => (
                            <Flex
                                key={professor.id}
                                alignItems={'center'}
                                justifyContent={'flex-start'}
                                borderBottom={'1px solid lightgray'}
                                paddingLeft={'5px'}
                                h={'100px'}
                            >
                                <Text fontSize={'20px'}>
                                    {`${professor.name} ${professor.surname}(${professor.title}`}
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
