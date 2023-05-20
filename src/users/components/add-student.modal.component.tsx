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
import { REGISTRATION_VALIDATION_SCHEMA } from '../../auth/auth.constants'

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
    specialization: string
    indexNumber: number
    indexYear: number
}
export const AddStudentModal = ({ isOpen, onClose, onRegister }: Props) => {
    const defaultValues: FormValues = {
        email: '',
        password: '',
        name: '',
        surname: '',
        specialization: '',
        indexNumber: 0,
        indexYear: new Date().getFullYear(),
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        shouldUnregister: true,
        defaultValues,
        resolver: yupResolver(REGISTRATION_VALIDATION_SCHEMA),
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
                            <FormControl
                                isInvalid={errors.surname !== undefined}
                            >
                                <FormLabel>Surname</FormLabel>
                                <Input size={'lg'} {...register('surname')} />
                                <FormErrorMessage>
                                    {errors.surname?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing={6} w={400}>
                            <FormControl
                                isInvalid={errors.specialization !== undefined}
                            >
                                <FormLabel>Specialization</FormLabel>
                                <Input
                                    size={'lg'}
                                    {...register('specialization')}
                                />
                                <FormErrorMessage>
                                    {errors.specialization?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={errors.indexNumber !== undefined}
                            >
                                <FormLabel>Index number</FormLabel>
                                <Input
                                    size={'lg'}
                                    {...register('indexNumber', {
                                        valueAsNumber: true,
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.indexNumber?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={errors.indexYear !== undefined}
                            >
                                <FormLabel>Index year</FormLabel>
                                <Input
                                    size={'lg'}
                                    {...register('indexYear', {
                                        valueAsNumber: true,
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.indexYear?.message}
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
