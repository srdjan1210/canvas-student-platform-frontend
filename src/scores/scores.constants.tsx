import * as yup from 'yup'
export const CREATE_TEST_DEFAULT_VALUES = {
    name: '',
    description: '',
    points: 0,
}

export const CREATE_TEST_VALIDATION_SCHEMA = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    points: yup.number().positive().required(),
})
