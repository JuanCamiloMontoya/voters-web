import { combineReducers } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "../services/auth/auth.slice";
import { votersReducer } from "../services/voters/voters.slice";
import { generalReducer } from "../services/general/general.slice";
import { messagingReducer } from "../services/messaging/messaging.slice";

const reducers = combineReducers({
  auth: authReducer,
  general: generalReducer,
  messaging: messagingReducer,
  voters: votersReducer,
});

const rootReducer = (state: RootState | undefined, action: PayloadAction) => {
  if (action.type === "auth/logout") state = undefined;
  return reducers(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth/passwordReset"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof reducers>;
export default persistedReducer;
