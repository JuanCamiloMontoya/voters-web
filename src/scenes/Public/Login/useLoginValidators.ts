import Joi from "joi"
import { LoginPayload } from "../../../services/auth/auth.models"

const useLoginValidators = () => {

  const loginValidator = Joi.object<LoginPayload>({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'any.required': 'Ingrese su correo electrónico!',
        'string.empty': 'Ingrese su correo electrónico!',
        'string.email': 'Debe ser un correo electrónico válido!'
      }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        'any.required': 'Ingrese su contraseña!',
        'string.empty': 'Ingrese su contraseña!',
        'string.min': 'La contraseña debe tener mínimo 8 carácteres!',
      })
  })

  return {
    loginValidator
  }
}

export default useLoginValidators