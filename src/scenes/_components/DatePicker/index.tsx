import { DatePicker as DatePickerAntd, Form, Typography } from "antd";
import { Controller } from "react-hook-form";
import { DatePickerProps } from "./models";
import dayjs from "dayjs";

const { Item } = Form;
const { Text } = Typography;

const DatePicker = (props: DatePickerProps) => {
  const {
    name,
    control,
    error = undefined,
    label,
    required = true,
    placeholder,
    defaultPickerValue,
    disabledDate,
  } = props;

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <DatePickerAntd
            {...field}
            style={{ width: "100%" }}
            onChange={(value) => onChange(value || undefined)}
            placeholder={placeholder}
            disabledDate={disabledDate}
            value={value && dayjs(value)}
            defaultPickerValue={defaultPickerValue}
          />
        )}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  );
};

export default DatePicker;
