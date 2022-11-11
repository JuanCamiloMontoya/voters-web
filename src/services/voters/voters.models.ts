import { Page } from "../../common/models/interfaces/page.interface"
import { StatusTypes } from "../../common/models/types/common.type"

export type VotersModulesTypes = 'getAll'

export interface Voter {
  firstname: string,
  lastname: string,
  phone: string
  document: string
  email: string
  id: string
}

export interface VotersStateTypes {
  voters: Page<Voter[]>,
  error: {
    getAll: string | null | undefined,
  },
  status: {
    getAll: StatusTypes,
  }
}

export interface GetAllPayload { }

export interface GetAllResponse extends Page<Voter[]> { }