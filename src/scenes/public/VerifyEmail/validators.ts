import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICode } from "../../../services/auth/auth.models";

export const useVerifyEmailValidators = () => {
  const verifyEmailValidator: yup.SchemaOf<ICode> = yup.object({
    code: yup
      .string()
      .required("Ingrese el código!")
      .min(6, "Complete todos los números!"),
  });

  return {
    verifyEmailResolver: yupResolver(verifyEmailValidator),
  };
};
