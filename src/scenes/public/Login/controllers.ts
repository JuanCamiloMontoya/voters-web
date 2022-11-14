import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import type { LoginPayload } from '../../../services/auth/auth.models'
import { useAuthSelectors } from '../../../services/auth/auth.selectors'
import { useAppDispatch } from '../../../store/store'
import { authActions } from '../../../services/auth/auth.slice'
import useLoginValidators from './validators'

const useLogin = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { status, error } = useAuthSelectors()

  const { resetStatus } = authActions

  const { loginValidator } = useLoginValidators()

  useEffect(() => {
    status.login === 'error' && dispatch(resetStatus('login'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginPayload>({
    resolver: joiResolver(loginValidator),
    mode: 'all'
  })

  const onFinish = (values: LoginPayload) => {
    console.log("-----", values)
    dispatch(authActions.login(values))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onResetPassword = () => {
    navigate('/password-reset-request')
  }

  const onCloseErrorAlert = () => {
    dispatch(authActions.resetStatus('login'))
  }

  return {
    status,
    error,
    control,
    errors,
    isValid,
    onFinish,
    onFinishFailed,
    onResetPassword,
    onCloseErrorAlert,
    handleSubmit
  }
}

export default useLogin