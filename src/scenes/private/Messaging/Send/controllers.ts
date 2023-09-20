import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { useMessagingSelectors } from "../../../../services/messaging/messaging.selectors";
import { messagingActions } from "../../../../services/messaging/messaging.slice";
import useSendMessageValidators from "./validators";
import { EGender } from "../../../../common/models/enums/gender.enum";
import { SendMesssageData } from "../../../../services/messaging/messaging.models";
import { useEffect, useState } from "react";
import { useGeneralSelectors } from "../../../../services/general/general.selectors";
import { generalActions } from "../../../../services/general/general.slice";

const useSendMessage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [openSuccesModal, setOpenSuccessModal] = useState(false);

  const {
    fullSubdivisions,
    occupations,
    hobbies,
    status: generalStatus,
    error: generalError,
  } = useGeneralSelectors();

  const {
    status: messagingStatus,
    error: messagingError,
    messages,
  } = useMessagingSelectors();

  const { getAllMessages, resetStatus } = messagingActions;

  const { getFullSubdivisions, getHobbies, getOccupations } = generalActions;
  const { sendMessageResolver } = useSendMessageValidators();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SendMesssageData>({
    resolver: sendMessageResolver,
    mode: "all",
  });

  useEffect(() => {
    messagingStatus.sendMessage === "error" && onCloseErrorAlert();
    !occupations.length && dispatch(getOccupations({}));
    !hobbies.length && dispatch(getHobbies({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToMessages = () => {
    navigate("/messaging");
  };

  const onCloseErrorAlert = () => {
    dispatch(resetStatus("sendMessage"));
  };

  const onFinish = (data: SendMesssageData) => {
    console.log("DATA", data);
    /*  const onSuccess = () => setOpenSuccessModal(true);
    dispatch(createVoter({ data, onSuccess })); */
  };

  const genders = Object.values(EGender).map((gender) => ({
    label: gender,
    value: gender,
  }));

  return {
    control,
    errors,
    messagingError,
    isValid,
    messagingStatus,
    genders,
    occupations,
    hobbies,
    goToMessages,
    handleSubmit,
    onCloseErrorAlert,
    onFinish,
    reset,
  };
};

export default useSendMessage;
