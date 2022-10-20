import { AuthStateTypes } from "./AuthModels"

export const authInitialState = (): AuthStateTypes => ({
  isAuthenticated: false,
  accessToken: null,
  passwordReset: {
    email: null,
    code: null
  },
  error: {
    login: null,
    passwordResetRequest: null,
    verifyEmail: null,
    resetPassword: null
  },
  status: {
    login: 'idle',
    passwordResetRequest: 'idle',
    verifyEmail: 'idle',
    resetPassword: 'idle'
  }
})