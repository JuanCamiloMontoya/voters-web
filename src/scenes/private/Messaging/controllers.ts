import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";

const useMessaging = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onNewMessage = () => {
    navigate("/messaging/send");
  };

  return {
    onNewMessage,
  };
};

export default useMessaging;
