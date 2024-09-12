import * as yup from 'yup';

export const validationSchemaPatient = yup.object({
  name: yup.string().required('O campo nome é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('O campo email é obrigatório'),
  phoneNumber: yup.string().required('O campo telefone é obrigatório'),
  address: yup.string().required('O campo endereço é obrigatório'),
  dateOfBirth: yup
    .string()
    .required('O campo data de nascimento é obrigatório'),
});
