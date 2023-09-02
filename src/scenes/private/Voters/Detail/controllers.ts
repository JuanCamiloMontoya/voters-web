import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVotersSelectors } from "../../../../services/voters/voters.selectors";
import { votersActions } from "../../../../services/voters/voters.slice";
import { useAppDispatch } from "../../../../store/store";

const useVoterDetail = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { getVoterDetail, resetStatus, resetVoter, deleteVoter } =
    votersActions;

  const { voter, error, status } = useVotersSelectors();

  useEffect(() => {
    id && dispatch(getVoterDetail({ id }));
    return () => {
      dispatch(resetVoter());
    };
  }, []);

  const onCloseErrorAlert = () => {
    dispatch(resetStatus("getVoterDetail"));
  };

  const goBack = () => {
    navigate(-1);
  };

  const onUpdateVoter = (id: number | string) => {
    navigate(`/voters/update/${id}`);
  };

  const onDeleteVoter = (id: number | string) => {
    const onSuccess = () => navigate("/voters");
    dispatch(deleteVoter({ id, onSuccess }));
  };

  return {
    voter,
    error,
    status,
    onCloseErrorAlert,
    onUpdateVoter,
    goBack,
    onDeleteVoter,
  };
};

export default useVoterDetail;
