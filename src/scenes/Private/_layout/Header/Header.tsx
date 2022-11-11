import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Dropdown, Layout, Menu, Typography } from "antd"
import useHeader from "./useHeader"

const { Header: AntdHeader } = Layout
const { Text } = Typography

const Header = () => {

  const {
    onLogout,
    onProfile
  } = useHeader()

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: "Perfil",
          icon: <UserOutlined />,
          onClick: onProfile
        },
        {
          key: '2',
          label: 'Cerrar sesión',
          icon: <LogoutOutlined />,
          onClick: onLogout
        }
      ]}
    />
  )

  return (
    <AntdHeader className="private-header">
      <Dropdown overlay={menu}>
        <Button type="text">
          <Text className="font-white">Juan</Text>
          <Divider type="vertical" />
          <Avatar icon={<UserOutlined />} />
        </Button>
      </Dropdown>
    </AntdHeader>
  )
}

export default Header