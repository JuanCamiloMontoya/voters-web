import { DatePicker as DatePickerAntd, Form, Typography } from 'antd'
import { Controller } from 'react-hook-form'
import { DatePickerProps } from './models'

const { Item } = Form
const { Text } = Typography

const DatePicker = (props: DatePickerProps) => {

  const {
    name,
    control,
    error = undefined,
    label,
    required = true,
    placeholder,
    defaultValue,
    disabledDate
  } = props

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <DatePickerAntd
            onChange={(value) => onChange(value?.toDate())}
            style={{ width: '100%' }}
            placeholder={placeholder}
            disabledDate={disabledDate}
            defaultValue={defaultValue}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  )
}

export default DatePicker