import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
    CREATE_TEST_DEFAULT_VALUES,
    CREATE_TEST_VALIDATION_SCHEMA,
} from './scores.constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateTest } from '../../../api/courses/tests/useCreateTest'
import { useState } from 'react'

export type FormValues = {
    name: string
    description: string
    points: number
    deadlineForSubmission?: Date
}

export type TestData = {
    name: string
    description: string
    points: number
    deadlineForSubmission?: Date
}
export interface Props {
    isOpen: boolean
    onClose: () => void
    onCreateTest: () => void
    course: string
}
export const CreateTestForm = ({
    isOpen,
    onClose,
    course,
    onCreateTest,
}: Props) => {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<FormValues>({
        defaultValues: CREATE_TEST_DEFAULT_VALUES,
        resolver: yupResolver(CREATE_TEST_VALIDATION_SCHEMA),
    })
    const { createTest } = useCreateTest()
    const [deadlineForSubmission, setDeadlineForSubmission] = useState<
        Date | undefined
    >()

    const onSubmit = async (data: TestData) => {
        const { error } = await createTest({
            ...data,
            course,
            deadlineForSubmission,
        })
        if (error) return
        reset()
        onCreateTest()
        onClose()
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create test</ModalHeader>
                <ModalBody>
                    <Flex direction={'column'}>
                        <FormControl isInvalid={errors.name !== undefined}>
                            <FormLabel>Name</FormLabel>
                            <Input {...register('name')} />
                            {errors.name && (
                                <FormErrorMessage>
                                    Name field is required!
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={errors.description !== undefined}
                        >
                            <FormLabel>Description</FormLabel>
                            <Input {...register('description')} />
                            {errors.description && (
                                <FormErrorMessage>
                                    Description field is required!
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.points !== undefined}>
                            <FormLabel>Points</FormLabel>
                            <Input
                                {...register('points', { valueAsNumber: true })}
                            />
                            {errors.points && (
                                <FormErrorMessage>
                                    Points are required and should be a positive
                                    number!
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors.deadlineForSubmission !== undefined
                            }
                        >
                            <FormLabel>Deadline For Submission</FormLabel>
                            <Input
                                type="date"
                                onChange={(e) =>
                                    setDeadlineForSubmission(
                                        new Date(e.target.value)
                                    )
                                }
                            />
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color={'white'}
                        background={'green'}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
