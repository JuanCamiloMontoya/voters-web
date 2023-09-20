import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstence } from "../../common/axios/interceptors";
import { ErrorMsgResponse } from "../../common/models/interfaces/common.interface";
import {
  GetMessagesAllPayload,
  GetMessagesAllResponse,
} from "./messaging.models";

export const messagingThunks = () => {
  const getAllMessages = createAsyncThunk<
    GetMessagesAllResponse,
    GetMessagesAllPayload,
    { rejectValue: ErrorMsgResponse }
  >("messaging/all", async (payload, { rejectWithValue }) => {
    try {
      const { data } = await apiInstence.get<GetMessagesAllResponse>(
        "/messaging",
        {
          params: payload,
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.toString() });
    }
  });

  return {
    getAllMessages,
  };
};
