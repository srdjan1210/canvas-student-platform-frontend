import { Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { REGISTRATION_VALIDATION_SCHEMA } from "../auth.constants"
import { InputLabel } from "../components/input-label.component"
import { useState } from "react"
import { SubmitButton } from "../components/submit-button.component"

type FormValues = {
    email: string,
    password: string,
    name: string,
    surname: string,
    title: string,
    specialization: string,
    indexNumber: number,
    indexYear: number
}

enum FormType {
    PROFESSOR,
    STUDENT
}



export const RegistrationPage = () => {

    const [role, setRole] = useState(FormType.PROFESSOR)

    const defaultValues: FormValues = {
        email: "",
        password: "",
        name: "",
        surname: "",
        title: "",
        specialization: "",
        indexNumber: 0,
        indexYear: new Date().getFullYear()
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
        shouldUnregister: true,
        defaultValues,
        resolver: yupResolver(REGISTRATION_VALIDATION_SCHEMA),
        mode: "onChange"
    })

    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            direction={"column"}
            h={"100%"}
            w={"100%"}
        >
            <Heading as={'h1'}>
                Register user
            </Heading>
            <Stack
                spacing={6}
                w={400}>
                <FormControl isInvalid={errors.email !== undefined}>
                    <FormLabel>Email</FormLabel>
                    <Input size={'lg'} {...register("email")} />
                    <FormErrorMessage>
                        {errors.email?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password !== undefined}>
                    <FormLabel>Password</FormLabel>
                    <Input size={'lg'}{...register("password")} />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.name !== undefined}>
                    <FormLabel>Name</FormLabel>
                    <Input size={'lg'} {...register("name")} />
                    <FormErrorMessage>
                        {errors.name?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.surname !== undefined}>
                    <FormLabel>Surname</FormLabel>
                    <Input size={'lg'} {...register("surname")} />
                    <FormErrorMessage>
                        {errors.surname?.message}
                    </FormErrorMessage>
                </FormControl>
                {
                    role === FormType.PROFESSOR &&
                    <FormControl isInvalid={errors.title !== undefined}>
                        <FormLabel>Title</FormLabel>
                        <Input size={'lg'} {...register("title")} />
                        <FormErrorMessage>
                            {errors.title?.message}
                        </FormErrorMessage>
                    </FormControl>
                }
                {
                    role === FormType.STUDENT &&
                    <FormControl isInvalid={errors.specialization !== undefined}>
                        <FormLabel>Specialization</FormLabel>
                        <Input size={'lg'} {...register("specialization")} />
                        <FormErrorMessage>
                            {errors.specialization?.message}
                        </FormErrorMessage>
                    </FormControl>
                }
                {
                    role === FormType.STUDENT &&
                    <FormControl isInvalid={errors.indexNumber !== undefined}>
                        <FormLabel>Index number</FormLabel>
                        <Input size={'lg'} {...register("indexNumber", { valueAsNumber: true })} />
                        <FormErrorMessage>
                            {errors.indexNumber?.message}
                        </FormErrorMessage>
                    </FormControl>

                }
                {
                    role === FormType.STUDENT &&
                    <FormControl isInvalid={errors.indexYear !== undefined}>
                        <FormLabel>Index year</FormLabel>
                        <Input size={'lg'} {...register("indexYear", { valueAsNumber: true })} />
                        <FormErrorMessage>
                            {errors.indexYear?.message}
                        </FormErrorMessage>
                    </FormControl>
                }
                <RadioGroup onChange={(val) => setRole(val === '0' ? FormType.PROFESSOR : FormType.STUDENT)}
                    value={role.toString()}>
                    <Stack direction={"row"}>
                        <Radio value={FormType.PROFESSOR.toString()} placeholder={"Professor"}>Professor</Radio>
                        <Radio value={FormType.STUDENT.toString()} placeholder={"Student"}>Student</Radio>
                    </Stack>
                </RadioGroup>
                <SubmitButton
                    disabled={!isValid}
                    minH={50}
                    onSubmit={handleSubmit(() => console.log(errors))}
                >
                    Register
                </SubmitButton>
            </Stack >

        </Flex >
    )
}