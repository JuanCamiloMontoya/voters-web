import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginPayload } from '../../../services/auth/auth.models'
import { useAuthSelectors } from '../../../services/auth/auth.selectors'
import { useAppDispatch } from '../../../store/store'
import { authActions } from '../../../services/auth/auth.slice'
import useLoginValidators from './validators'

const useLogin = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { status, error } = useAuthSelectors()

  const { login, resetStatus: resetStatus } = authActions

  const { loginResolver } = useLoginValidators()

  useEffect(() => {
    status.login === 'error' && onCloseErrorAlert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginPayload>({
    resolver: loginResolver,
    mode: 'all'
  })

  const onFinish = (values: LoginPayload) => {
    dispatch(login(values))
  }

  const onResetPassword = () => {
    navigate('/password-reset-request')
  }

  const onCloseErrorAlert = () => {
    dispatch(resetStatus('login'))
  }

  return {
    status,
    error,
    control,
    errors,
    isValid,
    onFinish,
    onResetPassword,
    onCloseErrorAlert,
    handleSubmit
  }
}

export default useLogin