import { useLocation } from "react-router-dom"

const usePrivate = () => {

  const { pathname } = useLocation()

  return {
    pathname
  }
}

export default usePrivate