import { Button, Typography, Form, Alert } from "antd";
import TextInput from "../../_components/TextInput";
import useResetPassword from "./controllers";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const {
    error,
    status,
    passwordReset,
    control,
    errors,
    isValid,
    handleSubmit,
    onCloseErrorAlert,
    onFinish,
    onLogin,
  } = useResetPassword();

  return (
    <Form
      name="password-reset"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={handleSubmit(onFinish)}
      className="public-form"
    >
      <Title level={3}>Actualizar contraseña</Title>
      {status.resetPassword === "error" && (
        <Alert
          message={error.resetPassword}
          type="error"
          showIcon
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      <Text>
        Crea una nueva contraseña para tu correo {passwordReset.email}
      </Text>
      <TextInput
        name="password"
        control={control}
        label="Contraseña"
        placeholder="Contraseña"
        maxLength={50}
        error={errors.password}
        isPassword
      />
      <TextInput
        name="passwordConfirm"
        control={control}
        label="Verificar contraseña"
        placeholder="Contraseña"
        maxLength={50}
        error={errors.passwordConfirm}
        isPassword
      />

      <div className="center-element">
        <Button
          htmlType="submit"
          type="primary"
          loading={status.resetPassword === "loading"}
          disabled={!isValid}
        >
          Guardar cambios e inciar sesión
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

export default ResetPassword;
