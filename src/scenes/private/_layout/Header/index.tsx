import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Dropdown, Layout, Typography } from "antd"
import type { MenuProps } from 'antd'
import useHeader from "./controllers"

const { Header: AntdHeader } = Layout
const { Text } = Typography

const Header = () => {

  const {
    onLogout,
    onProfile
  } = useHeader()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Perfil',
      icon: <UserOutlined />,
      onClick: onProfile
    },
    {
      key: '2',
      label: 'Cerrar sesión',
      icon: <LogoutOutlined />,
      onClick: onLogout
    }
  ]

  return (
    <AntdHeader className="private-header" >
      <Dropdown menu={{ items }}>
        <Button type="text">
          <Text className="font-white">Juan</Text>
          <Divider type="vertical" />
          <Avatar icon={<UserOutlined />} />
        </Button>
      </Dropdown>
    </AntdHeader >
  )
}

export default Header