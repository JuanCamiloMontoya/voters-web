import { HTMLInputTypeAttribute } from "react"
import { Control, FieldError } from "react-hook-form"

export interface TextInputProps {
  name: string
  control: Control<any>
  error: FieldError | undefined
  label: string
  placeholder: string
  maxLength: number
  required?: boolean
  isPassword?: boolean
  type?: HTMLInputTypeAttribute
}