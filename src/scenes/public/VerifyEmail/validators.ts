import Joi from "joi"
import { ICode } from "../../../services/auth/auth.models"

const useVerifyEmailValidators = () => {

  const verifyEmailValidator = Joi.object<ICode>({
    code: Joi.string()
      .required()
      .min(6)
      .messages({
        'any.required': 'Ingrese el código!',
        'string.empty': 'Ingrese el código!',
        'string.min': 'Complete todos los números!'
      })
  })

  return {
    verifyEmailValidator
  }
}

export default useVerifyEmailValidators