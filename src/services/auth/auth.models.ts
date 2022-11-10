import { OnSuccessCallback } from "../../common/models/interfaces/common.interface"
import { StatusTypes } from "../../common/models/types/common.type"

export type AuthModulesTypes = 'login' | 'passwordResetRequest' | 'verifyEmail' | 'resetPassword'

export interface AuthStateTypes {
  isAuthenticated: boolean,
  accessToken: string | null,
  passwordReset: {
    email: string | null,
    code: string | null,
  },
  error: {
    login: string | null | undefined,
    passwordResetRequest: string | null | undefined,
    verifyEmail: string | null | undefined,
    resetPassword: string | null | undefined
  },
  status: {
    login: StatusTypes,
    passwordResetRequest: StatusTypes,
    verifyEmail: StatusTypes,
    resetPassword: StatusTypes
  }
}

export interface LoginPayload {
  email: string,
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface PasswordResetRequestPayload extends OnSuccessCallback {
  data: { email: string }
}

export interface PasswordResetRequestResponse {
  email: string
}

export interface VerifyEmailPayload extends OnSuccessCallback {
  data: { email: string, code: string }
}

export interface VerifyEmailResponse {
  code: string
}

export interface ResetPasswordPayload extends OnSuccessCallback {
  password: string
}

export interface ResetPasswordResponse extends LoginResponse { }