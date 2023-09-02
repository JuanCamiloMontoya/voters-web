import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { debounce } from "lodash";
import { apiInstence } from "../../../../common/axios/interceptors";
import { CheckDocumentResponse, DocumentType, ResolveType } from "./models";
import { CreateVoterData } from "../../../../services/voters/voters.models";
import { useGeneralSelectors } from "../../../../services/general/general.selectors";
import { EGender } from "../../../../common/models/enums/gender.enum";

let currentDoc: DocumentType;
let currentDocState: boolean = true;

const isValidDocument = debounce(
  async (value: DocumentType, resolve: ResolveType) => {
    let isValid = false;
    try {
      if (!value || value.length < 7) {
        isValid = true;
        currentDoc = value;
      } else if (value === currentDoc) {
        isValid = currentDocState;
      } else {
        const {
          data: { exists },
        } = await apiInstence.get<CheckDocumentResponse>(
          `/voters/check-document/${value}`,
        );
        currentDocState = !exists;
        isValid = !exists;
        currentDoc = value;
      }
    } catch (error) {
      isValid = true;
      currentDoc = value;
    } finally {
      resolve(isValid);
    }
  },
  500,
);

export const useCreateVotersValidators = () => {
  const { fullSubdivisions, hobbies, occupations } = useGeneralSelectors();

  const createVoterValidator: yup.SchemaOf<CreateVoterData> = yup.object({
    document: yup
      .string()
      .required("Ingrese el número de documento!")
      .min(7, "Deben ser mínimo 7 dígitos!")
      .max(10, "Deben ser máximo 10 dígitos!")
      .matches(/^[0-9]+$/, "Debe ser un número!")
      .test(
        "exists",
        "El número de documento ya está registrado!",
        (value) => new Promise((resolve) => isValidDocument(value, resolve)),
      ),
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
    createVoterResolver: yupResolver(createVoterValidator),
  };
};
