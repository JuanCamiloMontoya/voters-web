import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SendMesssageData } from "../../../../services/messaging/messaging.models";

const useSendMessageValidators = () => {
  const sendMessageValidator: yup.SchemaOf<SendMesssageData> = yup.object({
    message: yup
      .string()
      .required("Ingrese el mensaje!")
      .min(10, "Deben ser mínimo 10 carácteres!")
      .max(100, "Deben ser máximo 100 carácteres!"),
    minimumAge: yup
      .number()
      .max(120)
      .min(18)
      .nullable()
      .test(
        "minimumAge",
        "La edad mínima debe ser menor que la edad máxima",
        (value, context) => {
          const { maximumAge } = context.parent;
          return value && maximumAge && value >= maximumAge ? false : true;
        }
      ),
    maximumAge: yup
      .number()
      .max(120)
      .min(18)
      .nullable()
      .test(
        "maximumAge",
        "La edad máxima debe ser mayor que la edad mínima",
        (value, context) => {
          const { minimumAge } = context.parent;
          return value && minimumAge && value <= minimumAge ? false : true;
        }
      ),
    files: yup
      .mixed()
      .test("required", "You need to provide a file", (file) => {
        console.log("FILES EXIST", file);
        // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
        if (file) return true;
        return false;
      })
      /* .test("fileSize", "The file is too large", (file) => {
        console.log("FILES SIZE", file);
        //if u want to allow only certain file sizes
        return file && file.size <= 2000000;
      }), */
  });

  return {
    sendMessageResolver: yupResolver(sendMessageValidator),
  };
};

export default useSendMessageValidators;
