import { Layout, Menu, } from "antd"
import { useNavigate } from 'react-router-dom'
const { Sider: AntdSider } = Layout

const Sider = () => {
  const icons = require(`@ant-design/icons`)

  const navigate = useNavigate()

  const menuOptions = [
    {
      key: '/',
      name: 'Inicio',
      icon: 'HomeOutlined',
      route: 'home'
    },
    {
      key: '/leaders',
      name: 'Líderes',
      icon: 'UsergroupAddOutlined',
      route: 'leaders'
    },
    {
      key: '/voters',
      name: 'Votantes',
      icon: 'FormOutlined',
      route: 'voters'
    }
  ]

  return (
    <AntdSider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ minHeight: '100vh' }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={({ key }) => navigate(key)}
        items={menuOptions.map(({ key, name, icon }) => {
          const Component = icons[icon]
          return ({
            key,
            icon: <Component />,
            label: name
          })
        })}
      />
    </AntdSider>
  )
}

export default Sider