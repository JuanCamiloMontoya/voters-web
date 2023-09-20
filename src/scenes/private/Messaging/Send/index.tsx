import { ArrowLeftOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Divider, Form, Row, Typography } from "antd";
import useSendMessage from "./controllers";
import { columnSizes } from "../../../../common/antd/theme";
import TextInput from "../../../_components/TextInput";
import NumberInput from "../../../_components/NumberInput";
import Select from "../../../_components/Select";
import FileInput from "../../../_components/FileInput";

const { Title } = Typography;

const SendMessage = () => {
  const {
    control,
    errors,
    messagingError,
    isValid,
    messagingStatus,
    genders,
    hobbies,
    occupations,
    goToMessages,
    onCloseErrorAlert,
    handleSubmit,
    onFinish,
  } = useSendMessage();

  return (
    <div className="create-voter">
      <Title level={3}>
        <ArrowLeftOutlined onClick={goToMessages} />
        <Divider type="vertical" />
        Enviar mensaje
      </Title>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleSubmit(onFinish)}
      >
        {messagingStatus.sendMessage === "error" && (
          <Alert
            message={messagingError.sendMessage}
            type="error"
            showIcon
            closable
            onClose={onCloseErrorAlert}
          />
        )}
        <Row gutter={10}>
          <Col xs={24}>
            <TextInput
              name="message"
              control={control}
              label="Mensaje"
              placeholder="Ingrese el mensaje..."
              maxLength={100}
              error={errors.message}
              textType="textarea"
              rows={5}
            />
          </Col>
          <Col xs={24}>
            <FileInput
              name="files"
              control={control}
              label="Archivos"
              error={errors.files}
              dragger
              multiple
              required={false}
              maxCount={5}
            />
          </Col>
          <Col xs={24}>
            <FileInput
              name="files"
              control={control}
              label="Archivos"
              error={errors.files}
              multiple
              required={false}
              maxCount={5}
            />
          </Col>
        </Row>
        <Title level={4}>Destinatarios</Title>
        <Row gutter={10}>
          <Col {...columnSizes} xs={12} sm={6} md={4} xl={3}>
            <NumberInput
              name="minimumAge"
              control={control}
              label="Edad mínima"
              error={errors.minimumAge}
              min={18}
              max={120}
              required={false}
              deps={["maximumAge"]}
            />
          </Col>
          <Col {...columnSizes} xs={12} sm={6} md={4} xl={3}>
            <NumberInput
              name="maximumAge"
              control={control}
              label="Edad máxima"
              error={errors.maximumAge}
              min={18}
              max={120}
              required={false}
              deps={["minimumAge"]}
            />
          </Col>
          <Col {...columnSizes}>
            <Select
              name="gender"
              control={control}
              label="Género"
              placeholder="Género"
              error={undefined}
              required={false}
              options={genders}
              allowClear
            />
          </Col>
          <Col {...columnSizes}>
            <Select
              name="subdivision"
              control={control}
              label="Vereda/Barrio"
              placeholder="Vereda/Barrio"
              error={undefined}
              required={false}
              options={[]}
              showSearch
              allowClear
            />
          </Col>
          <Col {...columnSizes}>
            <Select
              name="occupations"
              control={control}
              label="Ocupación(es)"
              placeholder="Ocupación(es)"
              error={undefined}
              required={false}
              options={occupations}
              showSearch={false}
              mode="multiple"
              allowClear
            />
          </Col>
          <Col {...columnSizes}>
            <Select
              name="hobbies"
              control={control}
              label="Pasatiempo(s)"
              placeholder="Pasatiempo(s)"
              error={undefined}
              required={false}
              options={hobbies}
              mode="multiple"
              allowClear
            />
          </Col>
        </Row>
        <div className="center-element">
          <Button
            htmlType="submit"
            loading={messagingStatus.sendMessage === "loading"}
            disabled={!isValid}
            type="primary"
          >
            Enviar mensaje
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SendMessage;
