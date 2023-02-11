import { Form, Typography } from "antd"
import ReactCodeInput from "react-code-input"
import { Controller } from "react-hook-form"
import { CodeInputProps } from "./models"

const { Item } = Form
const { Text } = Typography

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
        render={({ field: { onChange } }) => (
          <ReactCodeInput
            type={type}
            fields={fields}
            name={name}
            inputMode={inputMode}
            onChange={onChange}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  )
}

export default CodeInput