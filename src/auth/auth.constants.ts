import * as yup from "yup"

const VALID_EMAIL_FORMAT = "Field should have valid email format!"
const REQUIRED = "Field is required!"
const POSITIVE = "Field should have positive number value!"


export const REGISTRATION_VALIDATION_SCHEMA = yup.object({
    email: yup.string().email(VALID_EMAIL_FORMAT).required(REQUIRED),
    password: yup.string().min(8).required(REQUIRED),
    name: yup.string().required(REQUIRED),
    surname: yup.string().required(REQUIRED),
    title: yup.string().required(REQUIRED),
    specialization: yup.string().required(REQUIRED),
    indexNumber: yup.number().positive(POSITIVE).required(REQUIRED),
    indexYear: yup.number().positive(POSITIVE).required(REQUIRED)
})


export const LOGIN_VALIDATION_SCHEMA = yup.object({
    email: yup.string().email(VALID_EMAIL_FORMAT).required(REQUIRED),
    password: yup.string().min(8).required(REQUIRED)
})