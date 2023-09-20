import { MessagingState } from "./messaging.models";

export const messagingInitialState = (): MessagingState => ({
  messages: {
    data: [],
    meta: {
      current: 1,
      pageSize: 10,
      total: 10,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
  error: {
    getAllMessages: null,
    sendMessage: null,
  },
  status: {
    getAllMessages: "idle",
    sendMessage: "idle",
  },
});
