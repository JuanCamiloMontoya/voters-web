import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVotersSelectors } from '../../../services/voters/voters.selectors'
import { votersActions } from '../../../services/voters/voters.slice'
import { useAppDispatch } from '../../../store/store'

const useVoters = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { getAllVoters } = votersActions

  useEffect(() => {
    dispatch(getAllVoters({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { voters, status } = useVotersSelectors()

  const onCreateVoter = () => {
    navigate('/voters/create')
  }

  return {
    voters,
    status,
    onCreateVoter
  }
}

export default useVoters