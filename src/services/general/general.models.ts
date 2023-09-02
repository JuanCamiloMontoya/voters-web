import { IGeneralData } from "../../common/models/interfaces/common.interface";
import { TStatus } from "../../common/models/types/common.type";

export type GeneralThunksTypes =
  | "getDivisions"
  | "getSubdivisions"
  | "getFullSubdivisions"
  | "getHobbies"
  | "getOccupations";

export type DivisionsType = "commune" | "corregimiento";

export type SubdivisionsType = "neighborhood" | "rural_settlement";

export interface FullSubdivisions extends IGeneralData {}

export interface Hobbies extends IGeneralData {}

export interface Occupations extends IGeneralData {}

export interface Divisions extends IGeneralData {
  type: DivisionsType;
}

export interface Subdivisions extends IGeneralData {
  type: SubdivisionsType;
}

export interface GeneralState {
  divisions: Divisions[];
  subdivisions: Subdivisions[];
  fullSubdivisions: FullSubdivisions[];
  hobbies: Hobbies[];
  occupations: Occupations[];
  error: {
    getDivisions: string | null | undefined;
    getSubdivisions: string | null | undefined;
    getFullSubdivisions: string | null | undefined;
    getHobbies: string | null | undefined;
    getOccupations: string | null | undefined;
  };
  status: {
    getDivisions: TStatus;
    getSubdivisions: TStatus;
    getFullSubdivisions: TStatus;
    getHobbies: TStatus;
    getOccupations: TStatus;
  };
}

export interface GetDivisionsPayload {}

export interface GetDivisionsResponse extends Divisions {}

export interface GetSubdivisionsPayload {
  divisionId: number;
}

export interface GetSubdivisionsResponse extends Subdivisions {}

export interface GetFullSubdivisionsPayload {
  name: string;
}

export interface GetFullSubdivisionsResponse extends FullSubdivisions {}

export interface GetHobbiesPayload {}

export interface GetHobbiesResponse extends Hobbies {}

export interface GetOccupationsPayload {}

export interface GetOccupationsResponse extends Occupations {}
