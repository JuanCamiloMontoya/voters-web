import { EGender } from "../../common/models/enums/gender.enum";
import {
  ISuccessCallback,
  IGeneralData,
  ISuccessResponse,
} from "../../common/models/interfaces/common.interface";
import { IPage } from "../../common/models/interfaces/page.interface";
import {
  TDivision,
  TOrder,
  TStatus,
  TSubdivision,
} from "../../common/models/types/common.type";

export type VotersTypes =
  | "getAllVoters"
  | "createVoter"
  | "getVoterDetail"
  | "deleteVoter"
  | "updateVoter";

export interface Voter {
  id: number | string;
  firstname: string;
  lastname: string;
  phone: string;
  document: string;
  email?: string | null;
  gender?: EGender | null;
}

export interface VoterDetail extends Voter {
  birthdate: string;
  hobbies: IGeneralData[];
  occupations: IGeneralData[];
  subdivision: IGeneralData & {
    type: TDivision;
    division: IGeneralData & {
      type: TSubdivision;
    };
  };
}

export interface VotersState {
  voters: IPage<Voter[]>;
  voter: VoterDetail | null;
  error: {
    getAllVoters?: string | null;
    createVoter?: string | null;
    getVoterDetail?: string | null;
    deleteVoter?: string | null;
    updateVoter?: string | null;
  };
  status: {
    getAllVoters: TStatus;
    createVoter: TStatus;
    getVoterDetail: TStatus;
    deleteVoter: TStatus;
    updateVoter: TStatus;
  };
}

export interface GetVotersAllPayload {
  order?: TOrder;
  current: number;
  pageSize: number;
}

export interface GetVotersAllResponse extends IPage<Voter[]> {}

export interface CreateVoterData extends Omit<Voter, "id"> {
  birthdate?: Date | null;
  subdivision?: number | null;
  occupations?: number[];
  hobbies?: number[];
}

export interface CreateVoterPayload extends ISuccessCallback {
  data: CreateVoterData;
}

export interface CreateVoterResponse extends VoterDetail {}

export interface UpdateVoterData extends Omit<CreateVoterData, "document"> {}

export interface UpdateVoterPayload extends ISuccessCallback {
  data: UpdateVoterData;
  id: number | string;
}

export interface UpdateVoterResponse extends Voter {}

export interface GetVoterDetailPayload {
  id: number | string;
}

export interface GetVoterDetailResponse extends VoterDetail {}

export interface DeleteVoterPayload extends ISuccessCallback {
  id: number | string;
}

export interface DeleteVoterResponse extends ISuccessResponse {}
