import { Row } from "antd";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import PasswordResetRequest from "./PasswordResetRequest";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";

const Public = () => {
  return (
    <Row className="public">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/password-reset-request"
          element={<PasswordResetRequest />}
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Row>
  );
};

export default Public;
