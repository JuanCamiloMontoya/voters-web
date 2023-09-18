import { Form, Input as InputAntd, Typography } from "antd";
import { Controller } from "react-hook-form";
import useTextInput from "./controller";
import { TextInputProps } from "./models";

const { Item } = Form;
const { Text } = Typography;
const { Password, TextArea } = InputAntd;

const TextInput = (props: TextInputProps) => {
  const {
    name,
    control,
    error,
    label,
    placeholder,
    maxLength = 255,
    required = true,
    type = "text",
    disabled = false,
    textType = "text",
    rows = 1,
  } = props;

  const Input =
    textType === "password"
      ? Password
      : textType === "textarea"
      ? TextArea
      : InputAntd;

  const { validateLength } = useTextInput();

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Input
            {...field}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value || (required ? "" : null))}
            value={value}
            type={type}
            onKeyDown={(e) => value && validateLength(e, value, maxLength)}
            disabled={disabled}
            rows={rows}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  );
};

export default TextInput;
