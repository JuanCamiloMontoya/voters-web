import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGeneralSelectors } from "../../../../services/general/general.selectors";
import { generalActions } from "../../../../services/general/general.slice";
import { UpdateVoterData } from "../../../../services/voters/voters.models";
import { useVotersSelectors } from "../../../../services/voters/voters.selectors";
import { votersActions } from "../../../../services/voters/voters.slice";
import { useAppDispatch } from "../../../../store/store";
import { useUpdateVoterValidators } from "./validators";
import dayjs from "dayjs";
import { EGender } from "../../../../common/models/enums/gender.enum";

const useUpdateVoter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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

  const { updateVoter, resetStatus, getVoterDetail, resetVoter } =
    votersActions;
  const { getFullSubdivisions, getHobbies, getOccupations } = generalActions;

  const { updateVoterResolver } = useUpdateVoterValidators();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdateVoterData>({
    resolver: updateVoterResolver,
    mode: "all",
    shouldUnregister: true,
  });

  useEffect(() => {
    if (!id) return;

    dispatch(getVoterDetail({ id }));
    votersStatus.updateVoter === "error" && onCloseErrorAlert();
    !occupations.length && dispatch(getOccupations({}));
    !hobbies.length && dispatch(getHobbies({}));

    return () => {
      dispatch(resetVoter());
    };
  }, []);

  useEffect(() => {
    voter &&
      reset({
        ...voter,
        birthdate: voter.birthdate
          ? dayjs(voter.birthdate).toDate()
          : undefined,
        hobbies: voter.hobbies.map(({ id }) => id),
        occupations: voter.occupations.map(({ id }) => id),
        subdivision: voter.subdivision?.id,
      });
  }, [voter]);

  const onFinish = (data: UpdateVoterData, onSuccess: () => void) => {
    if (id) {
      dispatch(updateVoter({ data, onSuccess, id }));
    }
  };

  const goToVoters = () => {
    navigate("/voters");
  };

  const goBack = () => {
    navigate(-1);
  };

  const onSearchSubdivision = (name: string) => {
    name.length > 2 && dispatch(getFullSubdivisions({ name }));
  };

  const onCloseErrorAlert = () => {
    dispatch(resetStatus("updateVoter"));
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
    voter,
    isDirty,
    genders,
    handleSubmit,
    onFinish,
    onSearchSubdivision,
    onCloseErrorAlert,
    reset,
    goToVoters,
    goBack,
  };
};

export default useUpdateVoter;
