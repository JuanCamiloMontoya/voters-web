import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICode } from "../../../services/auth/auth.models";
import { useAuthSelectors } from "../../../services/auth/auth.selectors";
import { authActions } from "../../../services/auth/auth.slice";
import { useAppDispatch } from "../../../store/store";
import { useVerifyEmailValidators } from "./validators";

const useVerifyEmail = () => {
  const dispatch = useAppDispatch();

  const { status, error, passwordReset } = useAuthSelectors();

  const { verifyEmail, resetStatus } = authActions;

  const navigate = useNavigate();

  const { verifyEmailResolver } = useVerifyEmailValidators();

  useEffect(() => {
    status.verifyEmail === "error" && onCloseErrorAlert();

    if (!passwordReset.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICode>({
    resolver: verifyEmailResolver,
    mode: "all",
  });

  const onFinish = (data: ICode) => {
    const onSuccess = () => navigate("/reset-password");

    const endData = { ...data, email: passwordReset.email || "" };
    dispatch(verifyEmail({ data: endData, onSuccess }));
  };

  const onLogin = () => {
    navigate("/");
  };

  const onCloseErrorAlert = () => {
    dispatch(resetStatus("verifyEmail"));
  };

  return {
    error,
    passwordReset,
    status,
    control,
    errors,
    isValid,
    handleSubmit,
    onFinish,
    onLogin,
    onCloseErrorAlert,
  };
};

export default useVerifyEmail;
