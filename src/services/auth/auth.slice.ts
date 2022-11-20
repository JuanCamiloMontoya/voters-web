import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authThunks } from './auth.thunks'
import { authInitialState } from './auth.initialState'
import { AuthModulesTypes, AuthState } from './auth.models'

const initialState = authInitialState()
const thunks = authThunks()
const { login, passwordResetRequest, verifyEmail, resetPassword } = thunks

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus(state: AuthState, { payload }: PayloadAction<AuthModulesTypes>) {
      state.error[payload] = initialState.error[payload]
      state.status[payload] = initialState.status[payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status.login = 'loading'
        state.error.login = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status.login = 'idle'
        state.accessToken = payload.accessToken
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status.login = 'error'
        state.error.login = payload?.message
      })
      .addCase(passwordResetRequest.pending, (state) => {
        state.status.passwordResetRequest = 'loading'
        state.error.passwordResetRequest = null
        state.passwordReset.email = null
      })
      .addCase(passwordResetRequest.fulfilled, (state, { payload }) => {
        state.status.passwordResetRequest = 'idle'
        state.passwordReset.email = payload.email
      })
      .addCase(passwordResetRequest.rejected, (state, { payload }) => {
        state.status.passwordResetRequest = 'error'
        state.error.passwordResetRequest = payload?.message
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status.verifyEmail = 'loading'
        state.error.verifyEmail = null
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.status.verifyEmail = 'idle'
        state.passwordReset.code = payload.code
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.status.verifyEmail = 'error'
        state.error.verifyEmail = payload?.message
      })
      .addCase(resetPassword.pending, (state) => {
        state.status.resetPassword = 'loading'
        state.error.resetPassword = null
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.status.resetPassword = 'idle'
        state.accessToken = payload.accessToken
        state.isAuthenticated = true
        state.passwordReset = initialState.passwordReset
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.status.resetPassword = 'error'
        state.error.resetPassword = payload?.message
      })
  }
})

const authActions = { ...authSlice.actions, ...thunks }
const authReducer = authSlice.reducer

export { authActions, authReducer }