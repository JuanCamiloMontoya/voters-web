import { Button, Typography, Form, Input, Alert } from 'antd'
import TextInput from '../../_components/TextInput'
import usePasswordResetRequest from './controllers'

const { Item } = Form
const { Title, Text } = Typography

const PasswordResetRequest = () => {

  const {
    error,
    status,
    control,
    errors,
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
        <Alert
          message={error.passwordResetRequest}
          type="error"
          showIcon
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      <Item>
        <Text>
          Ingresa tu correo y te enviaremos un código para que puedas restablecer tu contraseña.
        </Text>
      </Item>
      <TextInput
        name='email'
        control={control}
        label='Correo'
        placeholder='Dirección de correo'
        maxLength={50}
        error={errors.email}
        required
      />
      <div className='text-center'>
        <Button
          htmlType='submit'
          className='primary-button'
          loading={status.passwordResetRequest === 'loading'}
        >
          Enviar código
        </Button>
      </div>
      <div className='text-center'>
        <Button onClick={onLogin} type="link" className='primary-link-button'>
          Iniciar sesión
        </Button>
      </div>
    </Form>
  )
}

export default PasswordResetRequest