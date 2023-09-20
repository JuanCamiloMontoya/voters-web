import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/reducers";

export const useMessagingSelectors = () => {
  const status = useSelector(
    createSelector(
      (state: RootState) => state.messaging.status,
      (status) => status
    )
  );

  const error = useSelector(
    createSelector(
      (state: RootState) => state.messaging.error,
      (error) => error
    )
  );

  const messages = useSelector(
    createSelector(
      (state: RootState) => state.messaging.messages,
      (messages) => messages
    )
  );

  return {
    status,
    error,
    messages,
  };
};
