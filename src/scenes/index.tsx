import Private from "./private"
import Public from "./public"
import useApp from "./controllers"

const App = () => {

  const { isAuthenticated } = useApp()

  return isAuthenticated ? <Private /> : <Public />

}

export default App