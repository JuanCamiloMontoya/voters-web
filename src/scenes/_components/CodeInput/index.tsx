import { Form, Typography } from "antd"
import ReactCodeInput, { InputModeTypes } from "react-code-input"
import { Controller, Control, FieldError } from "react-hook-form"

const { Item } = Form
const { Text } = Typography

interface CodeInputProps {
  name: string
  control: Control<any>
  error: FieldError | undefined,
  label: string
  fields: number,
  inputMode: InputModeTypes
  type?: 'text' | 'number' | 'password' | 'tel',
  required?: boolean
}

const CodeInput = (props: CodeInputProps) => {

  const {
    name,
    control,
    error,
    label,
    fields,
    inputMode,
    type = 'text',
    required = true
  } = props

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactCodeInput
            type={type}
            fields={fields}
            name={name}
            inputMode={inputMode}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  )
}

export default CodeInput