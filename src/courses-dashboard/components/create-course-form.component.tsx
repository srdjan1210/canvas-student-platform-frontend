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
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { LOGIN_VALIDATION_SCHEMA } from '../../auth/auth.constants'
import {
    CREATE_COURSE_DEFAULT_VALUES,
    CREATE_COURSE_SCHEMA,
} from '../course.constants'
import { useCreateCourse } from '../../api/courses/useCreateCourse'

export interface Props {
    isOpen: boolean
    onClose: () => void
}

export type FormValues = {
    espb: number
    year: number
    title: string
    description: string
}

export const CreateCourseForm = ({ isOpen, onClose }: Props) => {
    const { createCourse } = useCreateCourse()
    const {
        formState: { errors, isValid },
        handleSubmit,
        register,
    } = useForm<FormValues>({
        defaultValues: CREATE_COURSE_DEFAULT_VALUES,
        resolver: yupResolver(CREATE_COURSE_SCHEMA),
        mode: 'onChange',
    })

    const onSubmit = async (data: FormValues) => {
        const resp = await createCourse(data)
        if (!resp.error) {
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader title={'Create course'} />
                <ModalBody>
                    <Flex direction={'column'} gap={5}>
                        <FormControl isInvalid={errors.title !== undefined}>
                            <FormLabel>Title</FormLabel>
                            <Input size={'lg'} {...register('title')} />
                            <FormErrorMessage>
                                {errors.title?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={errors.description !== undefined}
                        >
                            <FormLabel>Description</FormLabel>
                            <Input size={'lg'} {...register('description')} />
                            <FormErrorMessage>
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.espb !== undefined}>
                            <FormLabel>ESPB</FormLabel>
                            <Input
                                type="number"
                                size={'lg'}
                                {...register('espb', { valueAsNumber: true })}
                            />
                            <FormErrorMessage>
                                {errors.espb?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.year !== undefined}>
                            <FormLabel>Year</FormLabel>
                            <Input
                                type="number"
                                size={'lg'}
                                {...register('year', { valueAsNumber: true })}
                            />
                            <FormErrorMessage>
                                {errors.year?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        background={'blue'}
                        color={'white'}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
