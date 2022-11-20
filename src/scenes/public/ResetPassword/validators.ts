import Joi from "joi"
import { ResetPasswordData } from "../../../services/auth/auth.models"

const useResetPasswordValidator = () => {

  const resetPasswordValidator = Joi.object<ResetPasswordData>({
    password: Joi.string()
      .required()
      .min(8)
      .message('La contraseña debe tener mínimo 8 carácteres!')
      .regex(/[a-z]{1,}/, { name: 'lowercase' })
      .message('La contraseña debe tener mínimo una letra minúscula!')
      .regex(/[A-Z]{1,}/, { name: 'camelcase' })
      .message('La contraseña debe tener mínimo una letra mayúscula!')
      .regex(/[0-9]{1,}/, { name: 'number' })
      .message('La contraseña debe tener mínimo un número!')
      .regex(/[!@#$%\-+&_*]{1,}/, { name: 'special-charaacter' })
      .message('La contraseña debe tener mínimo caracter especial (!@#$%-+&_*)!')
      .messages({
        'any.required': 'Ingrese su contraseña!',
        'string.empty': 'Ingrese su contraseña!',
      }),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'any.only': 'Las contraseñas no coinciden!'
      })
  })

  return {
    resetPasswordValidator
  }
}

export default useResetPasswordValidator