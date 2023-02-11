import { GeneralData } from "../../common/models/interfaces/common.interface"
import { StatusTypes } from "../../common/models/types/status.type"

export type GeneralTypes = 'getDivisions' |
  'getSubdivisions' |
  'getFullSubdivisions' |
  'getHobbies' |
  'getOccupations'
export type DivisionsType = 'commune' | 'corregimiento'
export type SubdivisionsType = 'neighborhood' | 'rural_settlement'

export interface FullSubdivisions extends GeneralData { }

export interface Hobbies extends GeneralData { }

export interface Occupations extends GeneralData { }

export interface Divisions extends GeneralData {
  type: DivisionsType
}

export interface Subdivisions extends GeneralData {
  type: SubdivisionsType
}

export interface GeneralState {
  divisions: Divisions[]
  subdivisions: Subdivisions[]
  fullSubdivisions: FullSubdivisions[]
  hobbies: Hobbies[]
  occupations: Occupations[]
  error: {
    getDivisions: string | null | undefined
    getSubdivisions: string | null | undefined
    getFullSubdivisions: string | null | undefined
    getHobbies: string | null | undefined
    getOccupations: string | null | undefined
  }
  status: {
    getDivisions: StatusTypes
    getSubdivisions: StatusTypes
    getFullSubdivisions: StatusTypes
    getHobbies: StatusTypes
    getOccupations: StatusTypes
  }
}

export interface GetDivisionsPayload { }

export interface GetDivisionsResponse extends Divisions { }

export interface GetSubdivisionsPayload {
  divisionId: number
}

export interface GetSubdivisionsResponse extends Subdivisions { }

export interface GetFullSubdivisionsPayload {
  name: string
}

export interface GetFullSubdivisionsResponse extends FullSubdivisions { }

export interface GetHobbiesPayload { }

export interface GetHobbiesResponse extends Hobbies { }

export interface GetOccupationsPayload { }

export interface GetOccupationsResponse extends Occupations { }