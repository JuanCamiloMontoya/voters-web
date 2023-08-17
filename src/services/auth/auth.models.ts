import { IEmail, ISuccessCallback } from "../../common/models/interfaces/common.interface"
import { StatusTypes } from "../../common/models/types/common.type"

export type AuthTypes = 'login' | 'passwordResetRequest' | 'verifyEmail' | 'resetPassword'

export interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  passwordReset: {
    email: string | null
    code: string | null
  }
  error: {
    login: string | null | undefined
    passwordResetRequest: string | null | undefined
    verifyEmail: string | null | undefined
    resetPassword: string | null | undefined
  }
  status: {
    login: StatusTypes
    passwordResetRequest: StatusTypes
    verifyEmail: StatusTypes
    resetPassword: StatusTypes
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface PasswordResetRequestPayload extends ISuccessCallback {
  data: IEmail
}

export interface PasswordResetRequestResponse {
  email: string
}

export interface ICode {
  code: string
}

export interface VerifyEmailPayload extends ISuccessCallback {
  data: IEmail & ICode
}

export interface VerifyEmailResponse {
  code: string
}

export interface ResetPasswordData {
  password: string
  passwordConfirm: string
}

export interface ResetPasswordPayload extends ISuccessCallback {
  data: ResetPasswordData
}

export interface ResetPasswordResponse extends LoginResponse { }