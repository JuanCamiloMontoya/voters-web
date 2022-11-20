import { Button, Typography, Form, Alert } from 'antd'
import TextInput from '../../_components/TextInput'
import useLogin from './controllers'

const { Title } = Typography

const Login = () => {

  const {
    error,
    status,
    control,
    errors,
    isValid,
    onFinish,
    onResetPassword,
    onCloseErrorAlert,
    handleSubmit
  } = useLogin()

  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={handleSubmit(onFinish)}
      className='public-form'
    >
      <Title>Voters App</Title>
      {status.login === 'error' && (
        <Alert
          message={error.login}
          type="error"
          showIcon
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      <TextInput
        name='email'
        control={control}
        label='Correo'
        placeholder='Dirección de correo'
        maxLength={50}
        error={errors.email}
      />
      <TextInput
        name='password'
        control={control}
        label='Contraseña'
        placeholder='Contraseña'
        maxLength={50}
        error={errors.password}
        isPassword
      />
      <div className='text-center'>
        <Button
          htmlType='submit'
          className='primary-button'
          loading={status.login === 'loading'}
          disabled={!isValid}
        >
          Iniciar sesión
        </Button>
      </div>
      <div className='text-center'>
        <Button
          onClick={onResetPassword}
          type="link"
          className='primary-link-button'
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </div>
    </Form>
  )
}

export default Login