import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messagingInitialState } from "./messaging.initialState";
import { messagingThunks } from "./messaging.thunks";
import { MessagingTypes, MessagingState } from "./messaging.models";

const initialState = messagingInitialState();
const thunks = messagingThunks();
const { getAllMessages } = thunks;

const messagingSlice = createSlice({
  name: "voters",
  initialState,
  reducers: {
    resetStatus(
      state: MessagingState,
      { payload }: PayloadAction<MessagingTypes>
    ) {
      state.error[payload] = initialState.error[payload];
      state.status[payload] = initialState.status[payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.status.getAllMessages = "loading";
        state.error.getAllMessages = null;
      })
      .addCase(getAllMessages.fulfilled, (state, { payload }) => {
        state.status.getAllMessages = "idle";
        state.messages = payload;
      })
      .addCase(getAllMessages.rejected, (state, { payload }) => {
        state.status.getAllMessages = "error";
        state.error.getAllMessages = payload?.message;
      });
  },
});

const messagingActions = { ...messagingSlice.actions, ...thunks };
const messagingReducer = messagingSlice.reducer;

export { messagingActions, messagingReducer };
