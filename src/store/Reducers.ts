import { combineReducers } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from "../services/Auth/AuthSlice"
import { votersReducer } from "../services/Voters/VotersSlice"

const reducers = combineReducers({
  auth: authReducer,
  voters: votersReducer
})

const rootReducer = (state: RootState | undefined, action: PayloadAction) => {
  if (action.type === 'auth/logout')
    state = undefined
  return reducers(state, action)
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth/passwordReset']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof reducers>
export default persistedReducer