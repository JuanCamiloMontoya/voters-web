import { VotersState } from "./voters.models"

export const votersInitialState = (): VotersState => ({
  voters: {
    data: [],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
  },
  error: {
    getAll: null,
  },
  status: {
    getAll: 'idle'
  }
})