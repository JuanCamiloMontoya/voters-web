import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstence } from "../../common/axios/interceptors";
import { ErrorMsgResponse } from "../../common/models/interfaces/common.interface";
import { RootState } from "../../store/reducers";
import {
  LoginPayload,
  LoginResponse,
  PasswordResetRequestPayload,
  PasswordResetRequestResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "./auth.models";

export const authThunks = () => {
  const login = createAsyncThunk<
    LoginResponse,
    LoginPayload,
    { rejectValue: ErrorMsgResponse }
  >("auth/login", async (payload, { rejectWithValue }) => {
    try {
      const { data } = await apiInstence.post<LoginResponse>(
        "/auth/login",
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.toString() });
    }
  });

  const passwordResetRequest = createAsyncThunk<
    PasswordResetRequestResponse,
    PasswordResetRequestPayload,
    { rejectValue: ErrorMsgResponse }
  >(
    "auth/password-reset-request",
    async ({ data, onSuccess }, { rejectWithValue }) => {
      try {
        const { data: response } =
          await apiInstence.post<PasswordResetRequestResponse>(
            "/auth/password-reset-request",
            data,
          );
        onSuccess();
        return response;
      } catch (error: any) {
        return rejectWithValue({ message: error.toString() });
      }
    },
  );

  const verifyEmail = createAsyncThunk<
    VerifyEmailResponse,
    VerifyEmailPayload,
    { rejectValue: ErrorMsgResponse }
  >("auth/verify-email", async ({ data, onSuccess }, { rejectWithValue }) => {
    try {
      const { data: response } = await apiInstence.post<VerifyEmailResponse>(
        `/auth/verify-email`,
        data,
      );
      onSuccess();
      return response;
    } catch (error: any) {
      return rejectWithValue({ message: error.toString() });
    }
  });

  const resetPassword = createAsyncThunk<
    ResetPasswordResponse,
    ResetPasswordPayload,
    { rejectValue: ErrorMsgResponse; state: RootState }
  >(
    "auth/reset-password",
    async ({ data, onSuccess }, { rejectWithValue, getState }) => {
      try {
        const {
          auth: { passwordReset },
        } = getState();
        const { data: response } =
          await apiInstence.post<ResetPasswordResponse>(
            "/auth/reset-password",
            { ...passwordReset, ...data },
          );
        onSuccess();
        return response;
      } catch (error: any) {
        return rejectWithValue({ message: error.toString() });
      }
    },
  );

  return {
    login,
    passwordResetRequest,
    verifyEmail,
    resetPassword,
  };
};
