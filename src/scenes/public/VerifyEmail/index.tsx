import { Button, Typography, Form, Alert } from 'antd'
import CodeInput from '../../_components/CodeInput'
import useVerifyEmail from './controllers'

const { Title, Text } = Typography

const VerifyEmail = () => {

  const {
    error,
    passwordReset,
    status,
    control,
    errors,
    isValid,
    handleSubmit,
    onFinish,
    onLogin,
    onCloseErrorAlert
  } = useVerifyEmail()

  return (
    <Form
      name='verify-email'
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={handleSubmit(onFinish)}
      className='public-form'
    >
      <Title level={3}>Verificar correo</Title>
      {status.verifyEmail === 'error' && (
        <Alert
          message={error.verifyEmail}
          type="error"
          showIcon
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      <Text>
        Hemos enviado un código de verificación a tu correo {passwordReset.email}.
        Ingrésalo para continuar:
      </Text>
      <CodeInput
        control={control}
        error={errors.code}
        fields={6}
        label='Código de verificación'
        name='code'
        type='number'
        inputMode='numeric'
      />
      <div className='text-center'>
        <Button
          htmlType='submit'
          className='primary-button'
          loading={status.verifyEmail === 'loading'}
          disabled={!isValid}
        >
          Verificar
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

export default VerifyEmail