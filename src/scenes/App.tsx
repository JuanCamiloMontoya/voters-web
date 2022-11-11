import { useAuthSelectors } from "../services/auth/auth.selectors"
import Private from "./private/Private"
import Public from "./public/Public"

const App = () => {

  const { isAuthenticated } = useAuthSelectors()

  return isAuthenticated ? <Private /> : <Public />

}

export default App