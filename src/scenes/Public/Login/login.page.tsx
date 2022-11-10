import { Button, Typography, Form, Input, Alert } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginPayload } from '../../../services/auth/auth.models'
import { useAuthSelectors } from '../../../services/auth/auth.selectors'
import { authActions } from '../../../services/auth/auth.slice'
import { useAppDispatch } from '../../../store/store'

const { Item } = Form
const { Password } = Input
const { Title } = Typography

const Login = () => {

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

  return (
    <Form
      name='login'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className='public-form'
    >
      <Title>Voters App</Title>
      {status.login === 'error' && (
        <Alert
          message={error.login}
          type="error"
          showIcon
          closable
          onClose={() => dispatch(authActions.resetStatus('login'))}
        />
      )}
      <Item
        label='Correo'
        name='email'
        rules={[
          { required: true, message: 'Ingrese su correo electrónico!' },
          { type: 'email', message: 'Debe ser un correo electrónico válido!' }
        ]}
      >
        <Input placeholder='Dirección de correo' maxLength={50} />
      </Item>
      <Item
        label='Contraseña'
        name='password'
        rules={[
          { required: true, message: 'Ingrese su contraseña!' },
          { min: 8, message: 'Ingrese mínimo 8 carácteres!' }
        ]}
      >
        <Password placeholder='Contraseña' maxLength={30} />
      </Item>
      <Item className='text-center'>
        <Button htmlType='submit' className='primary-button ' loading={status.login === 'loading'}>
          Iniciar sesión
        </Button>
      </Item>
      <div className='text-center'>
        <Button onClick={onResetPassword} type="link" className='primary-link-button'>
          ¿Olvidaste tu contraseña?
        </Button>
      </div>
    </Form>
  )
}

export default Login