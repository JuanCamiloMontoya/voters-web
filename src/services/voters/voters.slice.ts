import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { votersThunks } from './voters.thunks'
import { votersInitialState } from './voters.initialState'
import { VotersTypes, VotersState } from './voters.models'

const initialState = votersInitialState()
const thunks = votersThunks()
const { getAllVoters, createVoter } = thunks

const voterSlice = createSlice({
  name: "voters",
  initialState,
  reducers: {
    resetStatus(state: VotersState, { payload }: PayloadAction<VotersTypes>) {
      state.error[payload] = initialState.error[payload]
      state.status[payload] = initialState.status[payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVoters.pending, (state) => {
        state.status.getAllVoters = 'loading'
        state.error.getAllVoters = null
      })
      .addCase(getAllVoters.fulfilled, (state, { payload }) => {
        state.status.getAllVoters = 'idle'
        state.voters = payload
      })
      .addCase(getAllVoters.rejected, (state, { payload }) => {
        state.status.getAllVoters = 'error'
        state.error.getAllVoters = payload?.message
      })
      .addCase(createVoter.pending, (state) => {
        state.status.createVoter = 'loading'
        state.error.createVoter = null
      })
      .addCase(createVoter.fulfilled, (state, { payload }) => {
        state.status.createVoter = 'idle'
      })
      .addCase(createVoter.rejected, (state, { payload }) => {
        state.status.createVoter = 'error'
        state.error.createVoter = payload?.message
      })
  }
})

const votersActions = { ...voterSlice.actions, ...thunks }
const votersReducer = voterSlice.reducer

export { votersActions, votersReducer }