import { Dayjs } from "dayjs";
import { Control, FieldError } from "react-hook-form";

export interface DatePickerProps {
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: Dayjs;
  defaultPickerValue?: Dayjs;
  disabledDate?: (date: Dayjs) => boolean;
}
