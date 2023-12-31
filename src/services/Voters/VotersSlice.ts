import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { votersThunks } from './VotersThunks'
import { votersInitialState } from './VotersInitialState'
import { VotersModulesTypes, VotersStateTypes } from './VotersModels'

const initialState = votersInitialState()
const thunks = votersThunks()
const { getAll } = thunks

const voterSlice = createSlice({
  name: "voter",
  initialState,
  reducers: {
    resetStatus(state: VotersStateTypes, { payload }: PayloadAction<VotersModulesTypes>) {
      state.error[payload] = initialState.error[payload]
      state.status[payload] = initialState.status[payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.status.getAll = 'loading'
        state.error.getAll = null
      })
      .addCase(getAll.fulfilled, (state, { payload }) => {
        state.status.getAll = 'idle'
        state.voters = payload
      })
      .addCase(getAll.rejected, (state, { payload }) => {
        state.status.getAll = 'error'
        state.error.getAll = payload?.message
      })
  }
})

const votersActions = { ...voterSlice.actions, ...thunks }
const votersReducer = voterSlice.reducer

export { votersActions, votersReducer }