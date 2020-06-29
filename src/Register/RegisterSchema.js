import * as Yup from 'yup';


export const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username too short')
        .max(16, 'Username too long')
        .required('Username required')
    ,
    password: Yup.string()
        .min(6, 'Password too short')
        .max(16, 'Password too long')
        .required('Password required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email required'),
    terms: Yup.boolean()
        .oneOf([true], 'Must agree to terms'),
});

