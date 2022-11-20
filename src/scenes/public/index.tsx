import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Row } from "antd"
import Login from "./Login"
import PasswordResetRequest from "./PasswordResetRequest"
import ResetPassword from "./ResetPassword"
import VerifyEmail from "./VerifyEmail"

const Public = () => {

  return (
    <Row className='public'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password-reset-request" element={<PasswordResetRequest />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </Row>
  )
}

export default Public