import { Button, Typography, Form, Alert } from 'antd'
import ReactCodeInput from 'react-code-input'
import useVerifyEmail from './useVerifyEmail'

const { Item } = Form
const { Title, Text } = Typography

const VerifyEmail = () => {

  const {
    error,
    passwordReset,
    status,
    onFinish,
    onFinishFailed,
    onLogin,
    onCloseErrorAlert
  } = useVerifyEmail()

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
            onClose={onCloseErrorAlert}
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