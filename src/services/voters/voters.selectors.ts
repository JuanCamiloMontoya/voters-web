import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/reducers";

export const useVotersSelectors = () => {
  const status = useSelector(
    createSelector(
      (state: RootState) => state.voters.status,
      (status) => status,
    ),
  );

  const error = useSelector(
    createSelector(
      (state: RootState) => state.voters.error,
      (error) => error,
    ),
  );

  const voters = useSelector(
    createSelector(
      (state: RootState) => state.voters.voters,
      (voters) => voters,
    ),
  );

  const voter = useSelector(
    createSelector(
      (state: RootState) => state.voters.voter,
      (voter) => voter,
    ),
  );

  return {
    status,
    error,
    voters,
    voter,
  };
};
