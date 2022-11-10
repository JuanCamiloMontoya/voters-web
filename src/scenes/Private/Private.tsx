import { Layout } from "antd"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sider from './_layout/sider/sider.comp'
import Header from './_layout/header/header.comp'
import Home from "./home/home.page"
import Leaders from "./leaders/leaders.page"
import Voters from "./voters/voters.page"
import Profile from './profile/profile.page'

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