import { Form, Input as InputAntd, Typography } from "antd";
import { Controller } from "react-hook-form";
import useTextInput from "./controller";
import { TextInputProps } from "./models";

const { Item } = Form;
const { Text } = Typography;

const TextInput = (props: TextInputProps) => {
  const {
    name,
    control,
    error,
    label,
    placeholder,
    maxLength = 255,
    required = true,
    isPassword = false,
    type = "text",
    disabled = false,
  } = props;

  const Input = isPassword ? InputAntd.Password : InputAntd;

  const { validateLength } = useTextInput();

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value || (required ? "" : null))}
            value={value}
            type={type}
            onKeyDown={(e) => value && validateLength(e, value, maxLength)}
            disabled={disabled}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  );
};

export default TextInput;
