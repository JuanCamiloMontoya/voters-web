import { useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store/reducers"

export const useAuthSelectors = () => {

  const status = useSelector(createSelector(
    (state: RootState) => state.auth.status,
    status => status
  ))

  const error = useSelector(createSelector(
    (state: RootState) => state.auth.error,
    error => error
  ))

  const isAuthenticated = useSelector(createSelector(
    (state: RootState) => state.auth.isAuthenticated,
    isAuthenticated => isAuthenticated
  ))

  const passwordReset = useSelector(createSelector(
    (state: RootState) => state.auth.passwordReset,
    passwordReset => passwordReset
  ))

  return {
    status,
    error,
    isAuthenticated,
    passwordReset
  }
}