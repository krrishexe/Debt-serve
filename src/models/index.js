import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    username: Yup.string().min(3).required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6).required('Password is required'),

})

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6).required('Password is required')
})

export const forgotPasswordSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required')
})

export const confirmPasswordSchema = Yup.object({
    password: Yup.string().min(6).required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
})