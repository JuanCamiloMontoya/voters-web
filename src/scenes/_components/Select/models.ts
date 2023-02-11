import { DefaultOptionType } from 'antd/es/select'
import { Control, FieldError, Merge } from 'react-hook-form'

export interface SelectProps {
  name: string
  control: Control<any>
  error?: FieldError | FieldError[] | undefined | Merge<FieldError, (FieldError | undefined)[]>
  label: string
  placeholder: string
  options: DefaultOptionType[]
  required?: boolean
  onCustomChange?: (value: number) => void | null
  showSearch?: boolean
  onSearch?: (value: string) => void | null
  loading?: boolean
  allowClear?: boolean
  mode?: 'multiple' | 'tags' | undefined
}