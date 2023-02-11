import { combineReducers } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from "../services/auth/auth.slice"
import { votersReducer } from "../services/voters/voters.slice"
import { generalReducer } from "../services/general/general.slice"

const reducers = combineReducers({
  auth: authReducer,
  voters: votersReducer,
  general: generalReducer
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