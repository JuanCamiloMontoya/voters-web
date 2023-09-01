import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generalInitialState } from "./general.initialState";
import {
  FullSubdivisions,
  GeneralState,
  GeneralThunksTypes,
} from "./general.models";
import { generalThunks } from "./general.thunks";

const initialState = generalInitialState();
const thunks = generalThunks();
const {
  getDivisions,
  getSubdivisions,
  getFullSubdivisions,
  getHobbies,
  getOccupations,
} = thunks;

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    resetStatus(
      state: GeneralState,
      { payload }: PayloadAction<GeneralThunksTypes>,
    ) {
      state.error[payload] = initialState.error[payload];
      state.status[payload] = initialState.status[payload];
    },
    setFullSubdivisions(
      state: GeneralState,
      { payload }: PayloadAction<FullSubdivisions[]>,
    ) {
      state.fullSubdivisions = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDivisions.pending, (state) => {
        state.status.getDivisions = "loading";
        state.error.getDivisions = null;
      })
      .addCase(getDivisions.fulfilled, (state, { payload }) => {
        state.status.getDivisions = "idle";
        state.divisions = payload;
      })
      .addCase(getDivisions.rejected, (state, { payload }) => {
        state.status.getDivisions = "error";
        state.error.getDivisions = payload?.message;
      })
      .addCase(getSubdivisions.pending, (state) => {
        state.status.getSubdivisions = "loading";
        state.error.getSubdivisions = null;
      })
      .addCase(getSubdivisions.fulfilled, (state, { payload }) => {
        state.status.getSubdivisions = "idle";
        state.subdivisions = payload;
      })
      .addCase(getSubdivisions.rejected, (state, { payload }) => {
        state.status.getSubdivisions = "error";
        state.error.getSubdivisions = payload?.message;
      })
      .addCase(getFullSubdivisions.pending, (state) => {
        state.status.getFullSubdivisions = "loading";
        state.error.getFullSubdivisions = null;
      })
      .addCase(getFullSubdivisions.fulfilled, (state, { payload }) => {
        state.status.getFullSubdivisions = "idle";
        state.fullSubdivisions = payload;
      })
      .addCase(getFullSubdivisions.rejected, (state, { payload }) => {
        state.status.getFullSubdivisions = "error";
        state.error.getFullSubdivisions = payload?.message;
      })
      .addCase(getHobbies.pending, (state) => {
        state.status.getHobbies = "loading";
        state.error.getHobbies = null;
      })
      .addCase(getHobbies.fulfilled, (state, { payload }) => {
        state.status.getHobbies = "idle";
        state.hobbies = payload;
      })
      .addCase(getHobbies.rejected, (state, { payload }) => {
        state.status.getHobbies = "error";
        state.error.getHobbies = payload?.message;
      })
      .addCase(getOccupations.pending, (state) => {
        state.status.getOccupations = "loading";
        state.error.getOccupations = null;
      })
      .addCase(getOccupations.fulfilled, (state, { payload }) => {
        state.status.getOccupations = "idle";
        state.occupations = payload;
      })
      .addCase(getOccupations.rejected, (state, { payload }) => {
        state.status.getOccupations = "error";
        state.error.getOccupations = payload?.message;
      });
  },
});

const generalActions = { ...generalSlice.actions, ...thunks };
const generalReducer = generalSlice.reducer;

export { generalActions, generalReducer };
