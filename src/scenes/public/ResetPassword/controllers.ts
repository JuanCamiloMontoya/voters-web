import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthSelectors } from '../../../services/auth/auth.selectors'
import { authActions } from '../../../services/auth/auth.slice'
import { useAppDispatch } from '../../../store/store'

const useResetPassword = () => {

  const dispatch = useAppDispatch()
  const { status, error, passwordReset } = useAuthSelectors()
  const { resetPassword } = authActions

  const navigate = useNavigate()

  useEffect(() => {
    if (!passwordReset.email || !passwordReset.code)
      navigate('/')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFinish = ({ password }: { password: string }) => {
    const onSuccess = () => {
      navigate('/')
    }
    dispatch(resetPassword({ password, onSuccess }))
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
    status,
    passwordReset,
    onFinish,
    onFinishFailed,
    onLogin,
    onCloseErrorAlert
  }
}

export default useResetPassword