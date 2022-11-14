import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../../store/store"

const useHeader = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch({ type: 'auth/logout' })
    navigate('/')
  }

  const onProfile = () => {
    navigate('/profile')
  }

  return {
    onLogout,
    onProfile
  }
}

export default useHeader