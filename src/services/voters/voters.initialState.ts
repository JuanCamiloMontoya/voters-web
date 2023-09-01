import { VotersState } from "./voters.models"

export const votersInitialState = (): VotersState => ({
  voters: {
    data: [],
    meta: {
      current: 1,
      pageSize: 10,
      total: 10,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false
    }
  },
  voter: null,
  error: {
    getAllVoters: null,
    createVoter: null,
    getVoterDetail: null,
    deleteVoter: null,
    updateVoter: null
  },
  status: {
    getAllVoters: 'idle',
    createVoter: 'idle',
    getVoterDetail: 'idle',
    deleteVoter: 'idle',
    updateVoter: 'idle'
  }
})