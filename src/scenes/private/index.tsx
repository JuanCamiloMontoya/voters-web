import { Breadcrumb, Layout } from "antd"
import { Route, Routes, matchPath, useNavigate } from "react-router-dom"
import { HomeOutlined } from "@ant-design/icons"
import Sider from './_layout/Sider'
import Header from './_layout/Header'
import Home from "./Home"
import Leaders from "./Leaders"
import Voters from "./Voters"
import Profile from './Profile'
import CreateVoter from "./Voters/Create"
import usePrivate from "./controllers"
import VoterDetail from "./Voters/Detail"

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
      element: <CreateVoter />,
      breadcrumb: ['Personas', 'Crear votante']
    },
    {
      path: '/voters/:id',
      element: <VoterDetail />,
      breadcrumb: ['Personas', 'Detalle votante']
    },
    {
      path: '/profile',
      element: <Profile />,
      breadcrumb: ['Perfil']
    }
  ]

  const navigate = useNavigate()

  return (
    <Layout>
      <Sider />
      <Layout>
        <Header />
        <Content className='private-content'>
          <Breadcrumb>
            <Breadcrumb.Item><HomeOutlined /></Breadcrumb.Item>
            {routes.find(({ path }) => matchPath(path, pathname))?.breadcrumb.map((item, i) => (
              <Breadcrumb.Item key={i} onClick={() => { navigate('/') }}>{item}</Breadcrumb.Item>
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