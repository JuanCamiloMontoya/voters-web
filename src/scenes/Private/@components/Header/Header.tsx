import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { Avatar, Button, Divider, Dropdown, Layout, Menu, Typography } from "antd"
import { useAppDispatch } from "../../../../store/Store"

const { Header: AntdHeader } = Layout
const { Text } = Typography

const Header = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch({ type: 'auth/logout' })
    navigate('/')
  }

  const onProfileClick = () => {
    navigate('/profile')
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (<span>Perfil</span>),
          icon: <UserOutlined />,
          onClick: onProfileClick
        },
        {
          key: '2',
          label: (<span>Cerrar sesión</span>),
          icon: <LogoutOutlined />,
          onClick: logout
        }
      ]}
    />
  )

  return (
    <AntdHeader style={{ textAlign: 'right', padding: '0 5px' }}>
      <Dropdown overlay={menu}>
        <Button type="text">
          <Text style={{ color: '#FFF' }}>Juan</Text>
          <Divider type="vertical" />
          <Avatar icon={<UserOutlined />} />
        </Button>
      </Dropdown>
    </AntdHeader>
  )
}

export default Header