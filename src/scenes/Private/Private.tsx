import { Layout } from "antd"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sider from './_layout/Sider/Sider'
import Header from './_layout/Header/Header'
import Home from "./Home/Home"
import Leaders from "./Leaders/Leaders"
import Voters from "./Voters/Voters"
import Profile from './Profile/Profile'

const { Content } = Layout

const Private = () => {

  return (
    <Layout>
      <BrowserRouter>
        <Sider />
        <Layout>
          <Header />
          <Content className='private-content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leaders" element={<Leaders />} />
              <Route path="/voters" element={<Voters />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </Layout>
  )
}

export default Private