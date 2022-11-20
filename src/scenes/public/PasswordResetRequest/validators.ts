import Joi from "joi"
import { IEmail } from "../../../common/models/interfaces/common.interface"

const usePasswordResetRequestValidator = () => {

  const passwordResetRequestalidator = Joi.object<IEmail>({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'any.required': 'Ingrese su correo electrónico!',
        'string.empty': 'Ingrese su correo electrónico!',
        'string.email': 'Debe ser un correo electrónico válido!'
      })
  })

  return {
    passwordResetRequestalidator
  }
}

export default usePasswordResetRequestValidator