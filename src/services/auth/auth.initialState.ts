import { AuthState } from "./auth.models";

export const authInitialState = (): AuthState => ({
  isAuthenticated: false,
  accessToken: null,
  passwordReset: {
    email: null,
    code: null,
  },
  error: {
    login: null,
    passwordResetRequest: null,
    verifyEmail: null,
    resetPassword: null,
  },
  status: {
    login: "idle",
    passwordResetRequest: "idle",
    verifyEmail: "idle",
    resetPassword: "idle",
  },
});
