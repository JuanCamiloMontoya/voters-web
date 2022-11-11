import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginPayload } from '../../../services/auth/auth.models'
import { useAuthSelectors } from '../../../services/auth/auth.selectors'
import { useAppDispatch } from '../../../store/store'
import { authActions } from '../../../services/auth/auth.slice'

const useLogin = () => {

  const dispatch = useAppDispatch()

  const { status, error } = useAuthSelectors()

  const navigate = useNavigate()

  useEffect(() => {
    status.login === 'error' && dispatch(authActions.resetStatus('login'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFinish = (values: LoginPayload) => {
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
    onFinish,
    onFinishFailed,
    onResetPassword,
    onCloseErrorAlert
  }
}

export default useLogin