import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react'
import { SubmitButton } from '../../auth/components/submit-button.component'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PROFESSOR_REGISTRATION_VALIDATION_SCHEMA } from '../../auth/auth.constants'

interface Props {
    isOpen: boolean
    onClose: () => void
    onRegister: (value: FormValues) => void
}

export type FormValues = {
    email: string
    password: string
    name: string
    surname: string
    title: string
}
export const AddProfessorModal = ({ isOpen, onClose, onRegister }: Props) => {
    const defaultValues: FormValues = {
        email: '',
        password: '',
        name: '',
        surname: '',
        title: '',
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        shouldUnregister: true,
        defaultValues,
        resolver: yupResolver(PROFESSOR_REGISTRATION_VALIDATION_SCHEMA),
        mode: 'onChange',
    })

    const onSubmit = async (data: FormValues) => {
        onRegister(data)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={1000}>
                <ModalCloseButton />
                <ModalHeader>Register user</ModalHeader>
                <ModalBody>
                    <Flex
                        alignItems={'flex-start'}
                        justifyContent={'center'}
                        h={'100%'}
                        w={'100%'}
                        gap={10}
                    >
                        <Stack spacing={6} minW={400}>
                            <FormControl isInvalid={errors.email !== undefined}>
                                <FormLabel>Email</FormLabel>
                                <Input size={'lg'} {...register('email')} />
                                <FormErrorMessage>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={errors.password !== undefined}
                            >
                                <FormLabel>Password</FormLabel>
                                <Input size={'lg'} {...register('password')} />
                                <FormErrorMessage>
                                    {errors.password?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.name !== undefined}>
                                <FormLabel>Name</FormLabel>
                                <Input size={'lg'} {...register('name')} />
                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing={6} w={400}>
                            <FormControl
                                isInvalid={errors.surname !== undefined}
                            >
                                <FormLabel>Surname</FormLabel>
                                <Input size={'lg'} {...register('surname')} />
                                <FormErrorMessage>
                                    {errors.surname?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.title !== undefined}>
                                <FormLabel>Title</FormLabel>
                                <Input size={'lg'} {...register('title')} />
                                <FormErrorMessage>
                                    {errors.title?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton
                        minH={50}
                        onSubmit={handleSubmit(onSubmit)}
                        color={'white'}
                        background={'green'}
                    >
                        Register
                    </SubmitButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
