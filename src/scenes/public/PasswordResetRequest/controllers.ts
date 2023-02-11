import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { IEmail } from "../../../common/models/interfaces/common.interface"
import { useAuthSelectors } from "../../../services/auth/auth.selectors"
import { authActions } from "../../../services/auth/auth.slice"
import { useAppDispatch } from "../../../store/store"
import { usePasswordResetRequestValidator } from "./validators"

const usePasswordResetRequest = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { status, error } = useAuthSelectors()

  const { passwordResetRequest, resetStatus: resetStatus } = authActions

  const { passwordResetRequestResolver } = usePasswordResetRequestValidator()

  useEffect(() => {
    status.passwordResetRequest === 'error' && onCloseErrorAlert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IEmail>({
    resolver: passwordResetRequestResolver,
    mode: 'all'
  })

  const onFinish = (data: IEmail) => {
    const onSuccess = () => navigate('/verify-email')

    dispatch(passwordResetRequest({ data, onSuccess }))
  }

  const onLogin = () => {
    navigate('/')
  }

  const onCloseErrorAlert = () => {
    dispatch(resetStatus('passwordResetRequest'))
  }

  return {
    status,
    error,
    control,
    errors,
    isValid,
    handleSubmit,
    onFinish,
    onLogin,
    onCloseErrorAlert
  }
}

export default usePasswordResetRequest