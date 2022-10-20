import { Button, Typography, Form, Alert } from 'antd'
import { useEffect } from 'react'
import ReactCodeInput from 'react-code-input'
import { useNavigate } from 'react-router-dom'
import { useAuthSelectors } from '../../../services/Auth/AuthSelectors'
import { authActions } from '../../../services/Auth/AuthSlice'
import { useAppDispatch } from '../../../store/Store'

const { Item } = Form
const { Title, Text } = Typography

const VerifyEmail = () => {

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

  return (
    <Form
      name='verify-email'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className='public-form'
    >
      <Title level={3}>Verificar correo</Title>
      {status.verifyEmail === 'error' && (
        <Item>
          <Alert
            message={error.verifyEmail}
            type="error"
            showIcon
            closable
            onClose={() => dispatch(authActions.resetStatus('verifyEmail'))}
          />
        </Item>
      )}
      <Item>
        <Text>
          Hemos enviado un código de verificación a tu correo {passwordReset.email}.
          Introducelo a continuación para continuar
        </Text>
      </Item>
      <Item
        name='code'
        label='Código de verificación'
        rules={[
          { required: true, message: 'Ingrese el código!' },
          { min: 6, message: 'Complete todos los números!' }
        ]}
        className="text-center"
      >
        <ReactCodeInput
          type='number'
          fields={6}
          name='code'
          inputMode={'numeric'}
        />
      </Item>
      <Item className='text-center'>
        <Button
          htmlType='submit'
          className='primary-button'
          loading={status.verifyEmail === 'loading'}
        >
          Verificar
        </Button>
      </Item>
      <div className='text-center'>
        <Button onClick={onLogin} type="link" className='primary-link-button'>
          Iniciar sesión
        </Button>
      </div>
    </Form>
  )
}

export default VerifyEmail