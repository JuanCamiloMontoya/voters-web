import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useGeneralSelectors } from "../../../../services/general/general.selectors"
import { generalActions } from "../../../../services/general/general.slice"
import { CreateVoterData } from "../../../../services/voters/voters.models"
import { useVotersSelectors } from "../../../../services/voters/voters.selectors"
import { votersActions } from "../../../../services/voters/voters.slice"
import { useAppDispatch } from "../../../../store/store"
import { useCreateVotersValidators } from "./validators"

const useCreateVoters = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { status: votersStatus, error: votersError } = useVotersSelectors()
  const {
    fullSubdivisions,
    occupations,
    hobbies,
    status: generalStatus,
    error: generalError
  } = useGeneralSelectors()

  const { createVoter, resetStatus } = votersActions
  const { getFullSubdivisions, getHobbies, getOccupations } = generalActions

  const { createVoterResolver } = useCreateVotersValidators()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<CreateVoterData>({
    resolver: createVoterResolver,
    mode: 'all'
  })

  useEffect(() => {
    votersStatus.createVoter === 'error' && onCloseErrorAlert()
    !occupations.length && dispatch(getOccupations({}))
    !hobbies.length && dispatch(getHobbies({}))
  }, [])

  const onFinish = (values: CreateVoterData, onSuccess: () => void) => {
    dispatch(createVoter({ data: values, onSuccess }))
  }

  const goToVoters = () => {
    navigate('/voters')
  }

  const onSearchSubdivision = (name: string) => {
    name.length > 2 && dispatch(getFullSubdivisions({ name }))
  }

  const onCloseErrorAlert = () => {
    dispatch(resetStatus('createVoter'))
  }

  return {
    votersStatus,
    generalStatus,
    votersError,
    generalError,
    control,
    errors,
    isValid,
    fullSubdivisions,
    occupations,
    hobbies,
    handleSubmit,
    onFinish,
    onSearchSubdivision,
    onCloseErrorAlert,
    reset,
    goToVoters
  }
}

export default useCreateVoters