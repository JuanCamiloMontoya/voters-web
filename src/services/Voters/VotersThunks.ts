import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiInstence } from "../../common/axios/Interceptors"
import { ErrorMsgResponse } from "../../common/models/interfaces/Common"
import { GetAllPayload, GetAllResponse } from "./VotersModels"

export const votersThunks = () => {

  const getAll = createAsyncThunk<
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

  return {
    getAll
  }
}