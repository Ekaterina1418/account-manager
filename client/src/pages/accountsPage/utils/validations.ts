import * as yup from 'yup'

export const accountSchema = yup.object({
  label: yup.array().of(
    yup.object({
      text: yup.string().max(50, 'Максимум 50 символов'),
    }),
  ),
  type: yup
    .string()
    .oneOf(['ldap', 'local'], 'Неверный тип записи')
    .required('Тип записи обязателен'),
  login: yup.string().max(100, 'Максимум 100 символов').required('Логин обязателен'),
  password: yup
    .string()
    .nullable()
    .when('type', {
      is: 'local',
      then: (schema) => schema.required('Пароль обязателен').max(100, 'Максимум 100 символов'),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
})
