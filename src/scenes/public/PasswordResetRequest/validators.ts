import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IEmail } from "../../../common/models/interfaces/common.interface";

export const usePasswordResetRequestValidator = () => {
  const passwordResetRequestValidator: yup.SchemaOf<IEmail> = yup.object({
    email: yup
      .string()
      .required("Ingrese su correo!")
      .max(50, "Deben ser máximo 50 carácteres!")
      .email("Debe ser un correo electrónico válido!"),
  });

  return {
    passwordResetRequestResolver: yupResolver(passwordResetRequestValidator),
  };
};
