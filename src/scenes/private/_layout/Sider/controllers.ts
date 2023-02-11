import { useNavigate, useLocation } from "react-router-dom"
import { MenuProps } from "antd"

const menuOptions = [
  {
    key: '/',
    label: 'Inicio',
    icon: 'HomeOutlined'
  },
  {
    key: '/leaders',
    label: 'Líderes',
    icon: 'UsergroupAddOutlined'
  },
  {
    key: '/voters',
    label: 'Personas',
    icon: 'FormOutlined'
  }
]

const useSider = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleMenu: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return {
    handleMenu,
    menuOptions,
    pathname
  }
}

export default useSider