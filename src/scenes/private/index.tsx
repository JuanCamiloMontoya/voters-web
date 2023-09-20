import { Breadcrumb, Layout } from "antd";
import { Route, Routes, matchPath } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import Sider from "./_layout/Sider";
import Header from "./_layout/Header";
import Home from "./Home";
import Leaders from "./Leaders";
import Voters from "./Voters";
import Profile from "./Profile";
import CreateVoter from "./Voters/Create";
import usePrivate from "./controllers";
import VoterDetail from "./Voters/Detail";
import UpdateVoter from "./Voters/Update";
import Messaging from "./Messaging";
import SendMessage from "./Messaging/Send";

const { Content } = Layout;

const Private = () => {
  const { pathname, onBreadcrumbClick } = usePrivate();

  const routes = [
    {
      path: "/",
      element: <Home />,
      breadcrumb: [],
    },
    {
      path: "/leaders",
      element: <Leaders />,
      breadcrumb: [{ title: "Líderes", route: "/leaders" }],
    },
    {
      path: "/voters",
      element: <Voters />,
      breadcrumb: [{ title: "Votantes", route: "/voters" }],
    },
    {
      path: "/voters/create",
      element: <CreateVoter />,
      breadcrumb: [
        { title: "Votantes", route: "/voters" },
        { title: "Crear votante", route: "/voters/create" },
      ],
    },
    {
      path: "/voters/:id",
      element: <VoterDetail />,
      breadcrumb: [
        { title: "Votantes", route: "/voters" },
        { title: "Detalle de votante", route: "/voters/:id" },
      ],
    },
    {
      path: "/voters/update/:id",
      element: <UpdateVoter />,
      breadcrumb: [
        { title: "Votantes", route: "/voters" },
        { title: "Actualizar votante", route: "/voters/update/:id" },
      ],
    },
    {
      path: "/messaging",
      element: <Messaging />,
      breadcrumb: [{ title: "Mensajería", route: "/messaging" }],
    },
    {
      path: "/messaging/send",
      element: <SendMessage />,
      breadcrumb: [
        { title: "Mensajería", route: "/messaging" },
        { title: "Enviar mensaje", route: "/messaging/send" },
      ],
    },
    {
      path: "/profile",
      element: <Profile />,
      breadcrumb: [{ title: "Perfil", route: "/profile" }],
    },
  ];

  return (
    <Layout>
      <Sider />
      <Layout>
        <Header />
        <Content className="private-content">
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            {routes
              .find(({ path }) => matchPath(path, pathname))
              ?.breadcrumb.map((item, i) => (
                <Breadcrumb.Item
                  key={i}
                  onClick={() => onBreadcrumbClick(item.route)}
                >
                  <span
                    style={{
                      cursor: !matchPath(item.route, pathname)
                        ? "pointer"
                        : "auto",
                    }}
                  >
                    {item.title}
                  </span>
                </Breadcrumb.Item>
              ))}
          </Breadcrumb>
          <Routes>
            {routes.map(({ path, element }, i) => (
              <Route key={i} path={path} element={element} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Private;
