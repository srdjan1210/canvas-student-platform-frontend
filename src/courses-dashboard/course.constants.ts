import * as yup from 'yup'
export const CREATE_COURSE_SCHEMA = yup.object({
    espb: yup.number().required(),
    year: yup.number().required(),
    description: yup.string().required(),
    title: yup.string().required(),
})

export const CREATE_COURSE_DEFAULT_VALUES = {
    espb: 0,
    year: new Date().getFullYear(),
    description: '',
    title: '',
}
