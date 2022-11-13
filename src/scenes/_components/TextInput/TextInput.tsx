import { Form, Input as InputAnd, Typography } from "antd"
import { Controller, Control, FieldError } from "react-hook-form"

const { Item } = Form
const { Text } = Typography

interface TextInputProps {
  name: string
  control: Control<any>
  error: FieldError | undefined,
  label: string
  placeholder: string
  maxLength: number,
  required?: boolean,
  isPassword?: boolean
}

const TextInput = (props: TextInputProps) => {

  const {
    name,
    control,
    error,
    label,
    placeholder,
    maxLength,
    required = true,
    isPassword = false
  } = props

  const Input = isPassword ? InputAnd.Password : InputAnd

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  )
}

export default TextInput