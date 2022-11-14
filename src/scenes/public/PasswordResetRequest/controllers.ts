import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuthSelectors } from "../../../services/auth/auth.selectors"
import { authActions } from "../../../services/auth/auth.slice"
import { useAppDispatch } from "../../../store/store"
import usePasswordResetRequestValidator from "./validators"

const usePasswordResetRequest = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { status, error } = useAuthSelectors()
  const { passwordResetRequest } = authActions

  const { passwordResetRequestalidator } = usePasswordResetRequestValidator()


  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<{ email: string }>({
    resolver: joiResolver(passwordResetRequestalidator),
    mode: 'all'
  })

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
    control,
    errors,
    isValid,
    handleSubmit,
    onFinish,
    onFinishFailed,
    onLogin,
    onCloseErrorAlert
  }
}

export default usePasswordResetRequest