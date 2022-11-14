import { useNavigate } from "react-router-dom"
import { MenuInfo } from 'rc-menu/lib/interface'

const useSider = () => {

  const navigate = useNavigate()

  const handleMenu = ({ key }: MenuInfo) => navigate(key)

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

  return {
    handleMenu,
    menuOptions
  }
}

export default useSider