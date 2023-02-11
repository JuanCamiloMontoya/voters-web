import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../../store/reducers"

export const useGeneralSelectors = () => {

  const status = useSelector(createSelector(
    (state: RootState) => state.general.status,
    status => status
  ))

  const error = useSelector(createSelector(
    (state: RootState) => state.general.error,
    error => error
  ))

  const divisions = useSelector(createSelector(
    (state: RootState) => state.general.divisions,
    divisions => divisions
  ))

  const subdivisions = useSelector(createSelector(
    (state: RootState) => state.general.subdivisions,
    subdivisions => subdivisions
  ))

  const fullSubdivisions = useSelector(createSelector(
    (state: RootState) => state.general.fullSubdivisions,
    fullSubdivisions => fullSubdivisions.map(({ id, name }) => ({ label: name, value: id }))
  ))

  const hobbies = useSelector(createSelector(
    (state: RootState) => state.general.hobbies,
    hobbies => hobbies.map(({ id, name }) => ({ label: name, value: id }))
  ))

  const occupations = useSelector(createSelector(
    (state: RootState) => state.general.occupations,
    occupations => occupations.map(({ id, name }) => ({ label: name, value: id }))
  ))

  return {
    status,
    error,
    divisions,
    subdivisions,
    fullSubdivisions,
    occupations,
    hobbies
  }
}