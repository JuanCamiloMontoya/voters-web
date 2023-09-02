import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGeneralSelectors } from "../../../../services/general/general.selectors";
import { generalActions } from "../../../../services/general/general.slice";
import { CreateVoterData } from "../../../../services/voters/voters.models";
import { useVotersSelectors } from "../../../../services/voters/voters.selectors";
import { votersActions } from "../../../../services/voters/voters.slice";
import { useAppDispatch } from "../../../../store/store";
import { useCreateVotersValidators } from "./validators";
import { EGender } from "../../../../common/models/enums/gender.enum";

const useCreateVoters = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [openSuccesModal, setOpenSuccessModal] = useState(false);

  const {
    status: votersStatus,
    error: votersError,
    voter,
  } = useVotersSelectors();

  const {
    fullSubdivisions,
    occupations,
    hobbies,
    status: generalStatus,
    error: generalError,
  } = useGeneralSelectors();

  const { createVoter, resetStatus } = votersActions;

  const { getFullSubdivisions, getHobbies, getOccupations } = generalActions;

  const { createVoterResolver } = useCreateVotersValidators();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateVoterData>({
    resolver: createVoterResolver,
    mode: "all",
    defaultValues: {
      birthdate: null,
      document: undefined,
      email: null,
      firstname: undefined,
      gender: null,
      hobbies: [],
      lastname: undefined,
      occupations: [],
      phone: undefined,
      subdivision: null,
    },
  });

  useEffect(() => {
    votersStatus.createVoter === "error" && onCloseErrorAlert();
    !occupations.length && dispatch(getOccupations({}));
    !hobbies.length && dispatch(getHobbies({}));
  }, []);

  const onFinish = (data: CreateVoterData) => {
    const onSuccess = () => setOpenSuccessModal(true);
    dispatch(createVoter({ data, onSuccess }));
  };

  const goToVoters = () => {
    navigate("/voters");
  };

  const goToVoterDetail = () => {
    navigate(`/voters/${voter?.id}`);
  };

  const onNewRecord = () => {
    reset();
    setOpenSuccessModal(false);
  };

  const onSearchSubdivision = (name: string) => {
    name.length > 2 && dispatch(getFullSubdivisions({ name }));
  };

  const onCloseErrorAlert = () => {
    dispatch(resetStatus("createVoter"));
  };

  const genders = Object.values(EGender).map((gender) => ({
    label: gender,
    value: gender,
  }));

  return {
    votersStatus,
    generalStatus,
    votersError,
    generalError,
    control,
    errors,
    isValid,
    fullSubdivisions,
    occupations,
    hobbies,
    genders,
    openSuccesModal,
    handleSubmit,
    onFinish,
    onSearchSubdivision,
    onCloseErrorAlert,
    goToVoters,
    onNewRecord,
    goToVoterDetail,
  };
};

export default useCreateVoters;
