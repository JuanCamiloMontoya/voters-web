import React from 'react'
import { Layout } from "antd"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sider from './@components/Sider/Sider'
import Header from './@components/Header/Header'
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
          <Content style={{ margin: '24px 16px 0', boxShadow: '0 3px 10px #AAA' }}>
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