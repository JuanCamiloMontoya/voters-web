import { Layout, Menu, } from "antd"
import type { ItemType } from "antd/es/menu/hooks/useItems"
import useSider from "./controllers"

const { Sider: AntdSider } = Layout

const Sider = () => {

  const icons = require(`@ant-design/icons`)

  const {
    onOptionClick,
    menuOptions,
    pathname
  } = useSider()

  const menuItems: ItemType[] = menuOptions.map(({ key, label, icon }) => {
    const Component = icons[icon]
    return ({
      key,
      icon: <Component />,
      label
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
        selectedKeys={[`/${pathname.split('/')[1]}`]}
        onClick={onOptionClick}
        items={menuItems}
      />
    </AntdSider>
  )
}

export default Sider