import { GeneralState } from "./general.models"

export const generalInitialState = (): GeneralState => ({
  divisions: [],
  subdivisions: [],
  fullSubdivisions: [],
  hobbies: [],
  occupations: [],
  error: {
    getDivisions: null,
    getSubdivisions: null,
    getFullSubdivisions: null,
    getHobbies: null,
    getOccupations: null
  },
  status: {
    getDivisions: 'idle',
    getSubdivisions: 'idle',
    getFullSubdivisions: 'idle',
    getHobbies: 'idle',
    getOccupations: 'idle'
  }
})