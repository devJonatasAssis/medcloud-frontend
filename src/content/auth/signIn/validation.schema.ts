import * as yup from 'yup';

export const validationSchemaSignIn = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('O campo email é obrigatório'),
  password: yup.string().required('O campo senha é obrigatório'),
});
