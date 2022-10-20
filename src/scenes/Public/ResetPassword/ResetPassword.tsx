import { Button, Typography, Form, Alert, Input } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthSelectors } from '../../../services/Auth/AuthSelectors'
import { authActions } from '../../../services/Auth/AuthSlice'
import { useAppDispatch } from '../../../store/Store'

const { Item } = Form
const { Password } = Input
const { Title, Text } = Typography

const PasswordReset = () => {

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

  return (
    <Form
      name='password-reset'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className='public-form'
    >
      <Title level={3}>Actualizar contraseña</Title>
      {status.resetPassword === 'error' && (
        <Item>
          <Alert
            message={error.resetPassword}
            type="error"
            showIcon
            closable
            onClose={() => dispatch(authActions.resetStatus('resetPassword'))}
          />
        </Item>
      )}
      <Item>
        <Text>
          Crea una nueva contraseña para tu correo {passwordReset.email}
        </Text>
      </Item>
      <Item
        label='Contraseña'
        name="password"
        hasFeedback
        rules={[
          { required: true, message: 'Ingrese la contraseña!' },
          { min: 8, message: 'Ingrese mínimo 8 carácteres!' }
        ]}
      >
        <Password placeholder='Contraseña' maxLength={30} />
      </Item>
      <Item
        label='Verificar contraseña'
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Verifique la contraseña!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value)
                return Promise.resolve()
              return Promise.reject(new Error('Las contraseñas no coinciden!'))
            }
          })
        ]}
      >
        <Password placeholder='Contraseña' maxLength={30} />
      </Item>
      <Item className='text-center'>
        <Button
          htmlType='submit'
          className='primary-button'
          loading={status.resetPassword === 'loading'}
        >
          Guardar cambios e inciar sesión
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

export default PasswordReset