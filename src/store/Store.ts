import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import persistedReducer from './Reducers'

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(logger)
  )
})

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export { store, persistor }