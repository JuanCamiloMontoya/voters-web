import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useVotersSelectors } from "../../../../services/voters/voters.selectors"
import { votersActions } from "../../../../services/voters/voters.slice"
import { useAppDispatch } from "../../../../store/store"

const useVoterDetail = () => {

  const dispatch = useAppDispatch()
  const { id } = useParams()

  const { getVoterDetail } = votersActions
  const { voter, error, status } = useVotersSelectors()

  useEffect(() => {
    id && dispatch(getVoterDetail({ id }))
  }, [])

  return {
    voter,
    error,
    status
  }
}

export default useVoterDetail