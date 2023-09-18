import { Form, Slider as SliderAntd, Typography } from "antd";
import { Controller } from "react-hook-form";
import { SliderRangeProps, SliderSingleProps } from "./models";

const { Item } = Form;
const { Text } = Typography;

const Slider = (props: SliderSingleProps | SliderRangeProps) => {
  const {
    name,
    control,
    error = undefined,
    label,
    defaultValue,
    max,
    min,
    required = true,
    disabled = false,
    range = false,
  } = props;

  const commonProps = {
    max,
    min,
    disabled,
  };

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => {
          return range ? (
            <SliderAntd
              {...field}
              {...commonProps}
              onChange={onChange}
              range
              defaultValue={defaultValue as [number, number]}
            />
          ) : (
            <SliderAntd
              {...field}
              {...commonProps}
              onChange={onChange}
              defaultValue={defaultValue as number}
            />
          );
        }}
      />
      {error && <Text type="danger">{error.message}</Text>}
    </Item>
  );
};

export default Slider;
