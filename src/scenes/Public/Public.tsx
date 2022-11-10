import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Row } from "antd"
import Login from "./login/login.page"
import PasswordResetRequest from "./password-reset-request/password-reset-request.page"
import ResetPassword from "./reset-password/reset-password.page"
import VerifyEmail from "./verify-email/verify-email.page"

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