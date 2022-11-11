import Private from "./private/Private"
import Public from "./public/Public"
import useApp from "./useApp"

const App = () => {

  const { isAuthenticated } = useApp()

  return isAuthenticated ? <Private /> : <Public />

}

export default App