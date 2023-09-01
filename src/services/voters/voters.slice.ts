import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { votersThunks } from "./voters.thunks";
import { votersInitialState } from "./voters.initialState";
import { VotersTypes, VotersState } from "./voters.models";

const initialState = votersInitialState();
const thunks = votersThunks();
const { getAllVoters, createVoter, getVoterDetail, deleteVoter, updateVoter } =
  thunks;

const voterSlice = createSlice({
  name: "voters",
  initialState,
  reducers: {
    resetStatus(state: VotersState, { payload }: PayloadAction<VotersTypes>) {
      state.error[payload] = initialState.error[payload];
      state.status[payload] = initialState.status[payload];
    },
    resetVoter(state: VotersState) {
      state.voter = initialState.voter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVoters.pending, (state) => {
        state.status.getAllVoters = "loading";
        state.error.getAllVoters = null;
      })
      .addCase(getAllVoters.fulfilled, (state, { payload }) => {
        state.status.getAllVoters = "idle";
        state.voters = payload;
      })
      .addCase(getAllVoters.rejected, (state, { payload }) => {
        state.status.getAllVoters = "error";
        state.error.getAllVoters = payload?.message;
      })
      .addCase(createVoter.pending, (state) => {
        state.status.createVoter = "loading";
        state.error.createVoter = null;
      })
      .addCase(createVoter.fulfilled, (state) => {
        state.status.createVoter = "idle";
      })
      .addCase(createVoter.rejected, (state, { payload }) => {
        state.status.createVoter = "error";
        state.error.createVoter = payload?.message;
      })
      .addCase(getVoterDetail.pending, (state) => {
        state.status.getVoterDetail = "loading";
        state.error.getVoterDetail = null;
      })
      .addCase(getVoterDetail.fulfilled, (state, { payload }) => {
        state.status.getVoterDetail = "idle";
        state.voter = payload;
      })
      .addCase(getVoterDetail.rejected, (state, { payload }) => {
        state.status.getVoterDetail = "error";
        state.error.getVoterDetail = payload?.message;
        state.voter = initialState.voter;
      })
      .addCase(deleteVoter.pending, (state) => {
        state.status.deleteVoter = "loading";
        state.error.deleteVoter = null;
      })
      .addCase(deleteVoter.fulfilled, (state) => {
        state.status.deleteVoter = "idle";
      })
      .addCase(deleteVoter.rejected, (state, { payload }) => {
        state.status.deleteVoter = "error";
        state.error.deleteVoter = payload?.message;
      })
      .addCase(updateVoter.pending, (state) => {
        state.status.updateVoter = "loading";
        state.error.updateVoter = null;
      })
      .addCase(updateVoter.fulfilled, (state) => {
        state.status.updateVoter = "idle";
      })
      .addCase(updateVoter.rejected, (state, { payload }) => {
        state.status.updateVoter = "error";
        state.error.updateVoter = payload?.message;
      });
  },
});

const votersActions = { ...voterSlice.actions, ...thunks };
const votersReducer = voterSlice.reducer;

export { votersActions, votersReducer };
