import { Control, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface FileInputProps {
  name: string;
  control: Control<any>;
  label: string;
  error?:
    | FieldError
    | FieldError[]
    | Merge<
        FieldError,
        FieldErrorsImpl<NonNullable<File | File[] | undefined>>
      >;
  required?: boolean;
  multiple?: boolean;
  dragger?: boolean;
  maxCount?: number;
}
