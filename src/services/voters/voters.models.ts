import { ISuccessCallback, GeneralData, SuccessResponse } from "../../common/models/interfaces/common.interface"
import { Page } from "../../common/models/interfaces/page.interface"
import { OrderTypes, StatusTypes } from "../../common/models/types/common.type"

export type VotersTypes = 'getAllVoters' | 'createVoter' | 'getVoterDetail'

export interface Voter {
  firstname: string
  lastname: string
  phone: string
  document: string
  email?: string
  id: string
}

export interface VoterDetail extends Voter {
  birthdate: string
  hobbies: GeneralData[]
  occupations: GeneralData[]
  subdivision: GeneralData & {
    type: 'neighborhood' | 'rural_settlement'
    division: GeneralData & {
      type: 'commune' | 'corregimiento'
    }
  }
}

export interface VotersState {
  voters: Page<Voter[]>
  voter: VoterDetail | null | undefined
  error: {
    getAllVoters: string | null | undefined
    createVoter: string | null | undefined
    getVoterDetail: string | null | undefined
    deleteVoter: string | null | undefined
  }
  status: {
    getAllVoters: StatusTypes
    createVoter: StatusTypes
    getVoterDetail: StatusTypes
    deleteVoter: StatusTypes
  }
}

export interface GetVotersAllPayload {
  order?: OrderTypes
  current: number
  pageSize: number
}

export interface GetVotersAllResponse extends Page<Voter[]> { }

export interface CreateVoterData {
  firstname: string
  lastname: string
  phone: string
  document: string
  birthdate?: Date
  email?: string
  subdivisionId?: number
  occupations?: number[]
  hobbies?: number[]
}

export interface CreateVoterPayload extends ISuccessCallback {
  data: CreateVoterData
}

export interface CreateVoterResponse extends Voter { }

export interface GetVoterDetailPayload {
  id: number | string
}

export interface GetVoterDetailResponse extends VoterDetail { }

export interface DeleteVoterPayload {
  id: number | string
}

export interface DeleteVoterResponse extends SuccessResponse { }