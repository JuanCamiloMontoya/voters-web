import { Control, FieldError } from "react-hook-form";

export interface NumberInputProps {
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  defaultValue?: number;
  placeholder?: string;
  deps?: string[];
}
