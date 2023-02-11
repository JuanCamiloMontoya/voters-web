import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiInstence } from "../../common/axios/interceptors"
import { ErrorMsgResponse } from "../../common/models/interfaces/common.interface"
import { CreateVoterPayload, CreateVoterResponse, GetAllPayload, GetAllResponse } from "./voters.models"

export const votersThunks = () => {

  const getAllVoters = createAsyncThunk<
    GetAllResponse,
    GetAllPayload,
    { rejectValue: ErrorMsgResponse }
  >(
    'voters/all',
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await apiInstence.get<GetAllResponse>('/voters', payload)
        return data
      } catch (error: any) {
        return rejectWithValue({ message: error.toString() })
      }
    }
  )

  const createVoter = createAsyncThunk<
    CreateVoterResponse,
    CreateVoterPayload,
    { rejectValue: ErrorMsgResponse }
  >('voters/create',
    async ({ data, onSuccess }, { rejectWithValue }) => {
      try {
        const { data: response } = await apiInstence.post<CreateVoterResponse>('/voters', data)
        onSuccess()
        return response
      } catch (error: any) {
        return rejectWithValue({ message: error.toString() })
      }
    }
  )

  return {
    getAllVoters,
    createVoter
  }
}