import { InputModeTypes } from "react-code-input";
import { Control, FieldError } from "react-hook-form";

export interface CodeInputProps {
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
  label: string;
  fields: number;
  inputMode: InputModeTypes;
  type?: "text" | "number" | "password" | "tel";
  required?: boolean;
}
