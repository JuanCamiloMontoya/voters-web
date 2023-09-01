import Private from "./private";
import Public from "./public";
import useApp from "./controllers";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const { isAuthenticated } = useApp();

  return (
    <BrowserRouter>{isAuthenticated ? <Private /> : <Public />}</BrowserRouter>
  );
};

export default App;
