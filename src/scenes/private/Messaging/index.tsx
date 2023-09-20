import { PlusOutlined } from "@ant-design/icons";
import { Button, Row, Typography } from "antd";
import useMessaging from "./controllers";

const { Title } = Typography;

const Messaging = () => {
  const { onNewMessage } = useMessaging();

  return (
    <div className="voters">
      <Row>
        <Title level={2} style={{ flexGrow: 1 }}>
          Mensajería
        </Title>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={onNewMessage}
        />
      </Row>
    </div>
  );
};

export default Messaging;
