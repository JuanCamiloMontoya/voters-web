import { DefaultOptionType } from "antd/es/select";
import { Control, FieldError, Merge } from "react-hook-form";

export interface SelectProps {
  name: string;
  control: Control<any>;
  error?:
    | FieldError
    | FieldError[]
    | Merge<FieldError, (FieldError | undefined)[]>;
  label: string;
  placeholder: string;
  options: DefaultOptionType[];
  required?: boolean;
  showSearch?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  mode?: "multiple" | "tags";
  defaultValue?: number | string | string[] | number[] | null;
  onCustomChange?: (
    value: number | string | string[] | number[],
  ) => void | null;
  onSearch?: (value: string) => void | null;
}
