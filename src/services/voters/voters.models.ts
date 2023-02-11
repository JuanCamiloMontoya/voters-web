import { ISuccessCallback } from "../../common/models/interfaces/common.interface"
import { Page } from "../../common/models/interfaces/page.interface"
import { StatusTypes } from "../../common/models/types/status.type"

export type VotersTypes = 'getAllVoters' | 'createVoter'

export interface Voter {
  firstname: string
  lastname: string
  phone: string
  document: string
  email?: string
  id: string
}

export interface VotersState {
  voters: Page<Voter[]>
  error: {
    getAllVoters: string | null | undefined
    createVoter: string | null | undefined
  }
  status: {
    getAllVoters: StatusTypes
    createVoter: StatusTypes
  }
}

export interface GetAllPayload { }

export interface GetAllResponse extends Page<Voter[]> { }

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