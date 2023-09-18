import { Control, FieldError } from "react-hook-form";

export interface SliderBaseProps {
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
  label: string;
  min: number;
  max: number;
  required?: boolean;
  disabled?: boolean;
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false;
  defaultValue?: number;
}

export interface SliderRangeProps extends SliderBaseProps {
  range: true;
  defaultValue?: [number, number];
}
