import { useEffect } from 'react'
import { useVotersSelectors } from '../../../services/voters/voters.selectors'
import { votersActions } from '../../../services/voters/voters.slice'
import { useAppDispatch } from '../../../store/store'

const useVoters = () => {

  const dispatch = useAppDispatch()

  const { getAll } = votersActions

  useEffect(() => {
    dispatch(getAll({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { voters, status } = useVotersSelectors()

  return {
    voters,
    status
  }
}

export default useVoters