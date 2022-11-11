import { Button, Typography, Form, Alert, Input } from 'antd'
import useResetPassword from './useResetPassword'

const { Item } = Form
const { Password } = Input
const { Title, Text } = Typography

const ResetPassword = () => {

  const {
    error,
    status,
    passwordReset,
    onCloseErrorAlert,
    onFinish,
    onFinishFailed,
    onLogin
  } = useResetPassword()

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
            onClose={onCloseErrorAlert}
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

export default ResetPassword