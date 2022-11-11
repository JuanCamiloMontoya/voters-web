import { useNavigate } from "react-router-dom"
import { useAuthSelectors } from "../../../services/auth/auth.selectors"
import { authActions } from "../../../services/auth/auth.slice"
import { useAppDispatch } from "../../../store/store"

const usePasswordResetRequest = () => {

  const dispatch = useAppDispatch()
  const { status, error } = useAuthSelectors()
  const { passwordResetRequest } = authActions

  const navigate = useNavigate()

  const onFinish = (data: { email: string }) => {
    const onSuccess = () => navigate('/verify-email')

    dispatch(passwordResetRequest({ data, onSuccess }))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onLogin = () => {
    navigate('/')
  }

  const onCloseErrorAlert = () => {
    dispatch(authActions.resetStatus('passwordResetRequest'))
  }

  return {
    status,
    error,
    onFinish,
    onFinishFailed,
    onLogin,
    onCloseErrorAlert
  }
}

export default usePasswordResetRequest