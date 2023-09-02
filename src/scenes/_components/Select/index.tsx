import { Form, Select as SelectAntd, Typography } from "antd";
import { debounce } from "lodash";
import { Controller } from "react-hook-form";
import { SelectProps } from "./models";

const { Item } = Form;
const { Text } = Typography;
const { Option } = SelectAntd;

const Select = (props: SelectProps) => {
  const {
    name,
    control,
    error = undefined,
    label,
    placeholder,
    options,
    required = true,
    showSearch = false,
    loading = false,
    allowClear = false,
    mode,
    defaultValue,
    onSearch,
    onCustomChange,
  } = props;

  const search = showSearch
    ? {
        showSearch,
        onSearch: debounce((value: string) => onSearch && onSearch(value), 500),
        optionFilterProp: "children",
      }
    : null;

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <SelectAntd
            {...search}
            placeholder={placeholder}
            loading={loading}
            allowClear={allowClear}
            mode={mode}
            maxTagCount="responsive"
            defaultValue={defaultValue}
            onChange={(value) => {
              onChange(value || null);
              onCustomChange && onCustomChange(value);
            }}
          >
            {options.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </SelectAntd>
        )}
      />
      {Array.isArray(error)
        ? error.map(({ message }, i) => (
            <Text type="danger" key={i}>
              {message}
            </Text>
          ))
        : error && <Text type="danger">{error.message}</Text>}
    </Item>
  );
};

export default Select;
