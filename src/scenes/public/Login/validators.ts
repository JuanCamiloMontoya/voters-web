import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginPayload } from "../../../services/auth/auth.models"

const useLoginValidators = () => {

  const loginValidator: yup.SchemaOf<LoginPayload> = yup.object({
    email: yup.string()
      .required('Ingrese su correo!')
      .max(50, 'Deben ser máximo 50 carácteres!')
      .email('Debe ser un correo electrónico válido!'),
    password: yup.string()
      .required('Ingrese su contraseña!')
      .min(8, 'Deben mínimo 8 carácteres!')
      .max(50, 'Deben ser máximo 50 carácteres!')
  })

  return {
    loginResolver: yupResolver(loginValidator)
  }
}

export default useLoginValidators