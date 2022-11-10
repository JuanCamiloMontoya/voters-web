import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiInstence } from "../../common/axios/interceptors"
import { ErrorMsgResponse } from "../../common/models/interfaces/common.interface"
import { GetAllPayload, GetAllResponse } from "./voters.models"

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