import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useApplicationStore } from '../../store/application.store'
import {
    LOGIN_FORM_DEFAULT_VALUES,
    LOGIN_VALIDATION_SCHEMA,
} from '../auth.constants'
import { SubmitButton } from '../components/submit-button.component'

interface FormValues {
    email: string
    password: string
}

export const LoginPage = () => {
    const navigate = useNavigate()
    const signIn = useApplicationStore((state) => state.login)
    const token = useApplicationStore((state) => state.token)

    const {
        handleSubmit,
        formState: { errors, isValid },
        register,
    } = useForm<FormValues>({
        defaultValues: LOGIN_FORM_DEFAULT_VALUES,
        resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
        mode: 'onChange',
    })

    const login = async ({ email, password }: FormValues) => {
        const { user } = await signIn({ email, password })
        if (user) {
            navigate(`/dashboard/${user?.role.toLowerCase()}`)
            return
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        console.log(e.key)
        if (e.key == 'Enter') {
            handleSubmit(login)()
        }
    }

    return (
        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            w={'100%'}
            h={'100%'}
            onKeyDown={handleKeyDown}
        >
            <Flex
                className="outer-container"
                borderRadius={'15px'}
                h={'80%'}
                w={'70%'}
                boxShadow={
                    'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;'
                }
            >
                <Flex
                    className="left"
                    flex={1}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Flex
                        className="inner-form"
                        direction={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        w={'60%'}
                        gap={'20px'}
                    >
                        <Heading as={'h1'}>Sign in to your account!</Heading>
                        <FormControl isInvalid={errors.email !== undefined}>
                            <FormLabel>Email</FormLabel>
                            <Input size={'lg'} {...register('email')} />
                            <FormErrorMessage>
                                {errors.email?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password !== undefined}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type={'password'}
                                size={'lg'}
                                {...register('password')}
                            />
                            <FormErrorMessage>
                                {errors.password?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <SubmitButton
                            onSubmit={handleSubmit(login)}
                            width={'100%'}
                            height={'50px'}
                            fontSize={'1.3rem'}
                            color="white"
                            background={'green'}
                            disabled={!isValid}
                        >
                            Sign in!
                        </SubmitButton>
                    </Flex>
                </Flex>
                <Flex
                    className="right"
                    flex={1}
                    background={'green'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    direction={'column'}
                    gap={'10px'}
                >
                    <Heading as="h1" fontSize={'2.2rem'} color={'white'}>
                        Welcome to canvas platform!
                    </Heading>
                    <Text
                        color="white"
                        textAlign={'center'}
                        fontSize={'1.3rem'}
                        w={'70%'}
                    >
                        The goal of this platform is to help students learn more
                        efficiently by having all needed materials in one place!
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default LoginPage
