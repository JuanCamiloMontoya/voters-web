import { useAuthSelectors } from "../services/auth/auth.selectors"
import Private from "./private/private"
import Public from "./public/public"

const App = () => {

  const { isAuthenticated } = useAuthSelectors()

  return isAuthenticated ? <Private /> : <Public />

}

export default App