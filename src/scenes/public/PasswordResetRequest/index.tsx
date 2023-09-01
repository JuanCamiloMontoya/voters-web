import { Button, Typography, Form, Alert } from "antd";
import TextInput from "../../_components/TextInput";
import usePasswordResetRequest from "./controllers";

const { Title, Text } = Typography;

const PasswordResetRequest = () => {
  const {
    error,
    status,
    control,
    errors,
    isValid,
    handleSubmit,
    onCloseErrorAlert,
    onFinish,
    onLogin,
  } = usePasswordResetRequest();

  return (
    <Form
      name="password-reset-request"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={handleSubmit(onFinish)}
      className="public-form"
    >
      <Title level={3}>Recuperar contraseña</Title>
      {status.passwordResetRequest === "error" && (
        <Alert
          message={error.passwordResetRequest}
          type="error"
          showIcon
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      <Text>
        Ingresa tu correo y te enviaremos un código para que puedas restablecer
        tu contraseña.
      </Text>
      <TextInput
        name="email"
        control={control}
        label="Correo"
        placeholder="Dirección de correo"
        maxLength={50}
        error={errors.email}
        required
      />
      <div className="center-element">
        <Button
          htmlType="submit"
          type="primary"
          loading={status.passwordResetRequest === "loading"}
          disabled={!isValid}
        >
          Enviar código
        </Button>
      </div>
      <div className="center-element">
        <Button onClick={onLogin} type="link">
          Iniciar sesión
        </Button>
      </div>
    </Form>
  );
};

export default PasswordResetRequest;
