import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetPasswordData } from "../../../services/auth/auth.models";
import { useAuthSelectors } from "../../../services/auth/auth.selectors";
import { authActions } from "../../../services/auth/auth.slice";
import { useAppDispatch } from "../../../store/store";
import { useResetPasswordValidator } from "./validators";

const useResetPassword = () => {
  const dispatch = useAppDispatch();

  const { status, error, passwordReset } = useAuthSelectors();

  const { resetPassword, resetStatus } = authActions;

  const navigate = useNavigate();

  const { resetPasswordResolver } = useResetPasswordValidator();

  useEffect(() => {
    status.resetPassword === "error" && onCloseErrorAlert();

    if (!passwordReset.email || !passwordReset.code) navigate("/");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordData>({
    resolver: resetPasswordResolver,
    mode: "all",
  });

  const onFinish = (data: ResetPasswordData) => {
    const onSuccess = () => {
      navigate("/");
    };
    dispatch(resetPassword({ data, onSuccess }));
  };

  const onLogin = () => {
    navigate("/");
  };

  const onCloseErrorAlert = () => {
    dispatch(resetStatus("resetPassword"));
  };

  return {
    error,
    status,
    passwordReset,
    errors,
    control,
    isValid,
    handleSubmit,
    onFinish,
    onLogin,
    onCloseErrorAlert,
  };
};

export default useResetPassword;
