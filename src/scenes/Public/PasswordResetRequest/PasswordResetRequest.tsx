import { Button, Typography, Form, Input, Alert } from 'antd'
import usePasswordResetRequest from './usePasswordResetRequest'

const { Item } = Form
const { Title, Text } = Typography

const PasswordResetRequest = () => {

  const {
    error,
    status,
    onCloseErrorAlert,
    onFinish,
    onFinishFailed,
    onLogin
  } = usePasswordResetRequest()

  return (
    <Form
      name='password-reset-request'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className='public-form'
    >
      <Title level={3}>Recuperar contraseña</Title>
      {status.passwordResetRequest === 'error' && (
        <Item>
          <Alert
            message={error.passwordResetRequest}
            type="error"
            showIcon
            closable
            onClose={onCloseErrorAlert}
          />
        </Item>
      )}
      <Item>
        <Text>
          Ingresa tu correo y te enviaremos un código para que puedas restablecer tu contraseña.
        </Text>
      </Item>
      <Item
        name='email'
        rules={[
          { required: true, message: 'Ingrese su correo electrónico!' },
          { type: 'email', message: 'Debe ser un correo electrónico válido!' }
        ]}
      >
        <Input
          className='password-reset-request-input'
          maxLength={50}
          placeholder='Dirección de correo'
        />
      </Item>
      <Item className='text-center'>
        <Button
          htmlType='submit'
          className='primary-button'
          loading={status.passwordResetRequest === 'loading'}
        >
          Enviar código
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

export default PasswordResetRequest