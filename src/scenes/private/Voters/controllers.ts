import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVotersSelectors } from "../../../services/voters/voters.selectors";
import { votersActions } from "../../../services/voters/voters.slice";
import { useAppDispatch } from "../../../store/store";
import { TablePaginationConfig } from "antd";
import { GetVotersAllPayload } from "../../../services/voters/voters.models";

const useVoters = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { getAllVoters, deleteVoter } = votersActions;

  const { voters, status } = useVotersSelectors();

  useEffect(() => {
    const { current, pageSize } = voters.meta;
    dispatch(getAllVoters({ current, pageSize }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreateVoter = () => {
    navigate("/voters/create");
  };

  const onShowVoter = (id: number | string) => {
    navigate(`/voters/${id}`);
  };

  const onUpdateVoter = (id: number | string) => {
    navigate(`/voters/update/${id}`);
  };

  const onDeleteVoter = (id: number | string) => {
    dispatch(deleteVoter({ id }));
  };

  const onPageChange = (pageData: TablePaginationConfig) => {
    const { pageSize, current } = pageData;
    const payload: GetVotersAllPayload = {
      current: current || 1,
      pageSize: pageSize || 10,
    };
    dispatch(getAllVoters(payload));
  };

  return {
    voters,
    status,
    onCreateVoter,
    onShowVoter,
    onDeleteVoter,
    onUpdateVoter,
    onPageChange,
  };
};

export default useVoters;
