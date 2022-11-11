import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthSelectors } from '../../../services/auth/auth.selectors'
import { authActions } from '../../../services/auth/auth.slice'
import { useAppDispatch } from '../../../store/store'

const useVerifyEmail = () => {

  const dispatch = useAppDispatch()
  const { status, error, passwordReset } = useAuthSelectors()
  const { verifyEmail } = authActions

  const navigate = useNavigate()

  useEffect(() => {
    if (!passwordReset.email)
      navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFinish = (data: { code: string }) => {
    const onSuccess = () => navigate('/reset-password')

    const endData = { ...data, email: passwordReset.email || '' }
    dispatch(verifyEmail({ data: endData, onSuccess }))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onLogin = () => {
    navigate('/')
  }

  const onCloseErrorAlert = () => {
    dispatch(authActions.resetStatus('resetPassword'))
  }

  return {
    error,
    passwordReset,
    status,
    onFinish,
    onFinishFailed,
    onLogin,
    onCloseErrorAlert
  }
}

export default useVerifyEmail