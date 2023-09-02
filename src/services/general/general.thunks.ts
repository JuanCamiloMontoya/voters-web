import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstence } from "../../common/axios/interceptors";
import { ErrorMsgResponse } from "../../common/models/interfaces/common.interface";
import {
  GetDivisionsResponse,
  GetFullSubdivisionsPayload,
  GetFullSubdivisionsResponse,
  GetHobbiesPayload,
  GetHobbiesResponse,
  GetOccupationsPayload,
  GetOccupationsResponse,
  GetSubdivisionsPayload,
  GetSubdivisionsResponse,
} from "./general.models";

export const generalThunks = () => {
  const getDivisions = createAsyncThunk<
    GetDivisionsResponse[],
    undefined,
    { rejectValue: ErrorMsgResponse }
  >("general/divisions", async (_, { rejectWithValue }) => {
    try {
      const { data } =
        await apiInstence.get<GetDivisionsResponse[]>("/general/divisions");
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.toString() });
    }
  });

  const getSubdivisions = createAsyncThunk<
    GetSubdivisionsResponse[],
    GetSubdivisionsPayload,
    { rejectValue: ErrorMsgResponse }
  >("general/subdivisions", async ({ divisionId }, { rejectWithValue }) => {
    try {
      const { data } = await apiInstence.get<GetSubdivisionsResponse[]>(
        `/general/subdivisions/${divisionId}`,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.toString() });
    }
  });

  const getFullSubdivisions = createAsyncThunk<
    GetFullSubdivisionsResponse[],
    GetFullSubdivisionsPayload,
    { rejectValue: ErrorMsgResponse }
  >(
    "general/divisions-and-subdivisions",
    async ({ name }, { rejectWithValue }) => {
      try {
        const { data } = await apiInstence.get<GetFullSubdivisionsResponse[]>(
          `/general/full-subdivisions`,
          { params: { name } },
        );
        return data;
      } catch (error: any) {
        return rejectWithValue({ message: error.toString() });
      }
    },
  );

  const getHobbies = createAsyncThunk<
    GetHobbiesResponse[],
    GetHobbiesPayload,
    { rejectValue: ErrorMsgResponse }
  >("general/hobbies", async (_, { rejectWithValue }) => {
    try {
      const { data } =
        await apiInstence.get<GetHobbiesResponse[]>(`/general/hobbies`);
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.toString() });
    }
  });

  const getOccupations = createAsyncThunk<
    GetOccupationsResponse[],
    GetOccupationsPayload,
    { rejectValue: ErrorMsgResponse }
  >("general/occupations", async (_, { rejectWithValue }) => {
    try {
      const { data } =
        await apiInstence.get<GetOccupationsResponse[]>(`/general/occupations`);
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.toString() });
    }
  });

  return {
    getDivisions,
    getSubdivisions,
    getFullSubdivisions,
    getHobbies,
    getOccupations,
  };
};
