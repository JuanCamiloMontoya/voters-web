import { Breadcrumb, Layout } from "antd"
import { Route, Routes } from "react-router-dom"
import { HomeOutlined } from "@ant-design/icons"
import Sider from './_layout/Sider'
import Header from './_layout/Header'
import Home from "./Home"
import Leaders from "./Leaders"
import Voters from "./Voters"
import Profile from './Profile'
import CreateVoters from "./Voters/Create"
import usePrivate from "./controllers"

const { Content } = Layout

const Private = () => {

  const { pathname } = usePrivate()

  const routes = [
    {
      path: '/',
      element: <Home />,
      breadcrumb: []
    },
    {
      path: '/leaders',
      element: <Leaders />,
      breadcrumb: ['Líderes']
    },
    {
      path: '/voters',
      element: <Voters />,
      breadcrumb: ['Personas']
    },
    {
      path: '/voters/create',
      element: <CreateVoters />,
      breadcrumb: ['Personas', 'Crear votante']
    },
    {
      path: '/profile',
      element: <Profile />,
      breadcrumb: ['Perfil']
    }
  ]

  return (
    <Layout>
      <Sider />
      <Layout>
        <Header />
        <Content className='private-content'>
          <Breadcrumb>
            <Breadcrumb.Item><HomeOutlined /></Breadcrumb.Item>
            {routes.find(({ path }) => path === pathname)?.breadcrumb.map((item, i) => (
              <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
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
  )
}

export default Private