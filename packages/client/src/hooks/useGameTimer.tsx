import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { sendResultToLeaderboard } from '../api/leaderboard'

export const useGameTimer = () => {
  const status = useSelector((state: RootState) => state.game.status)
  const { life, score } = useSelector(
    (state: RootState) => state.gameProperties
  )
  const user = useSelector((state: RootState) => state.user)

  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (status == 'ON') {
      startTimeRef.current = Date.now()
    }
  }, [status])

  useEffect(() => {
    if (status == 'END') {
      const endTime = Date.now()
      const startTime = startTimeRef.current
      const time =
        startTime !== null ? ((endTime - startTime) / 1000).toFixed(2) : '0'

      sendResultToLeaderboard({
        user: user.login,
        score,
        time,
      }).catch(console.error)
    }
  }, [status, score, user.login])
}
