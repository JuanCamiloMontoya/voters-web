import { Layout, Menu, } from "antd"
import useSider from "./controllers"

const { Sider: AntdSider } = Layout

const Sider = () => {

  const icons = require(`@ant-design/icons`)

  const {
    handleMenu,
    menuOptions
  } = useSider()

  const menuItems = menuOptions.map(({ key, name, icon }) => {
    const Component = icons[icon]
    return ({
      key,
      icon: <Component />,
      label: name
    })
  })

  return (
    <AntdSider
      breakpoint="lg"
      collapsedWidth="0"
      className="private-sider"
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={handleMenu}
        items={menuItems}
      />
    </AntdSider>
  )
}

export default Sider