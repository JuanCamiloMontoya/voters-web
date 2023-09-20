import { Form, InputNumber, Typography } from "antd";
import { Controller } from "react-hook-form";
import { NumberInputProps } from "./models";

const { Item } = Form;
const { Text } = Typography;

const NumberInput = (props: NumberInputProps) => {
  const {
    name,
    control,
    error,
    label,
    required = true,
    max,
    min,
    defaultValue,
    placeholder,
    deps = [],
  } = props;

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        rules={{ deps }}
        render={({ field: { onChange, ...field } }) => (
          <InputNumber
            {...field}
            style={{ width: "100%" }}
            min={min}
            max={max}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  );
};

export default NumberInput;
