import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiInstence } from "../../common/axios/interceptors"
import { ErrorMsgResponse } from "../../common/models/interfaces/common.interface"
import {
  CreateVoterPayload,
  CreateVoterResponse,
  DeleteVoterPayload,
  DeleteVoterResponse,
  GetVoterDetailPayload,
  GetVoterDetailResponse,
  GetVotersAllPayload,
  GetVotersAllResponse
} from "./voters.models"
import { RootState } from "../../store/reducers"

export const votersThunks = () => {

  const getAllVoters = createAsyncThunk<
    GetVotersAllResponse,
    GetVotersAllPayload,
    { rejectValue: ErrorMsgResponse }
  >(
    'voters/all',
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await apiInstence.get<GetVotersAllResponse>('/voters', { params: payload })
        return data
      } catch (error: any) {
        return rejectWithValue({ message: error.toString() })
      }
    }
  )

  const getVoterDetail = createAsyncThunk<
    GetVoterDetailResponse,
    GetVoterDetailPayload,
    { rejectValue: ErrorMsgResponse }
  >(
    'voters/detail',
    async ({ id }, { rejectWithValue }) => {
      try {
        const { data } = await apiInstence.get<GetVoterDetailResponse>(`/voters/${id}`)
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
  >(
    'voters/create',
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

  const deleteVoter = createAsyncThunk<
    DeleteVoterResponse,
    DeleteVoterPayload,
    { rejectValue: ErrorMsgResponse, state: RootState }
  >(
    'voters/delete',
    async ({ id }, { rejectWithValue, dispatch, getState }) => {
      try {
        const { data: response } = await apiInstence.delete<DeleteVoterResponse>(`/voters/${id}`)

        const { voters: { voters: { meta: { current, pageSize } } } } = getState()
        dispatch(getAllVoters({ current, pageSize }))
        return response
      } catch (error: any) {
        return rejectWithValue({ message: error.toString() })
      }
    }
  )

  return {
    getAllVoters,
    createVoter,
    getVoterDetail,
    deleteVoter
  }
}