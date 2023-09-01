import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordData } from "../../../services/auth/auth.models";

export const useResetPasswordValidator = () => {
  const resetPasswordValidator: yup.SchemaOf<ResetPasswordData> = yup.object({
    password: yup
      .string()
      .required("Ingrese su contraseña!")
      .min(8, "La contraseña debe tener mínimo 8 carácteres!")
      .matches(
        /[a-z]{1,}/,
        "La contraseña debe tener mínimo una letra minúscula!",
      )
      .matches(
        /[A-Z]{1,}/,
        "La contraseña debe tener mínimo una letra mayúscula!",
      )
      .matches(/[0-9]{1,}/, "La contraseña debe tener mínimo un número!")
      .matches(
        /[!@#$%\-+&_*]{1,}/,
        "La contraseña debe tener mínimo caracter especial! Ej: !@#$%-+&_*",
      ),
    passwordConfirm: yup
      .string()
      .required("Confirme su contraseña!")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden!"),
  });

  return {
    resetPasswordResolver: yupResolver(resetPasswordValidator),
  };
};
