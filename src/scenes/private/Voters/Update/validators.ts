import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateVoterData } from "../../../../services/voters/voters.models";
import { useGeneralSelectors } from "../../../../services/general/general.selectors";
import { EGender } from "../../../../common/models/enums/gender.enum";

export const useUpdateVoterValidators = () => {
  const { fullSubdivisions, hobbies, occupations } = useGeneralSelectors();

  const updateVoterValidator: yup.SchemaOf<UpdateVoterData> = yup.object({
    firstname: yup
      .string()
      .required("Ingrese los nombre(s)!")
      .min(3, "Deben ser mínimo 3 carácteres!")
      .max(30, "Deben ser máximo 30 carácteres!"),
    lastname: yup
      .string()
      .required("Ingrese los apellidos!")
      .min(3, "Deben ser mínimo 3 carácteres!")
      .max(30, "Deben ser máximo 30 carácteres!"),
    phone: yup
      .string()
      .required("Ingrese el número de teléfono!")
      .matches(/^[0-9]+$/, "Debe ser un número!")
      .length(10, "Deben ser 10 dígitos!"),
      birthdate: yup.date().optional().nullable(),
    email: yup
      .string()
      .max(50, "Deben ser máximo 50 carácteres!")
      .email("Debe ser un correo electrónico válido!")
      .nullable(),
    gender: yup.mixed<EGender>().optional().nullable(),
    subdivision: yup
      .number()
      .oneOf([...fullSubdivisions.map(({ value }) => value), null])
      .optional()
      .nullable(),
    occupations: yup
      .array()
      .of(yup.number().oneOf(occupations.map(({ value }) => value)))
      .optional(),
    hobbies: yup
      .array()
      .of(yup.number().oneOf(hobbies.map(({ value }) => value)))
      .optional(),
  });

  return {
    updateVoterResolver: yupResolver(updateVoterValidator),
  };
};
