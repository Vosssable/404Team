import { useEffect, useRef, useState } from 'react'
import GameStart from '../components/GameStart'
import GameLayout from './game/GameLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { endGame, startGame, resetGame } from '../store/gameSlice'
import GameEnd from '../components/GameEnd'
import { useDefaultProperties } from '../store/gameProperties'
import { useDefaultPosition } from '../store/wolfPosition'
import { sendResultToLeaderboard } from '../api/leaderboard'

const GamePage = () => {
  const dispatch = useDispatch()
  const status = useSelector((state: RootState) => state.game.status)
  const user = useSelector((state: RootState) => state.user)
  const { life, score } = useSelector(
    (state: RootState) => state.gameProperties
  )

  const [gameRestartKey, setGameRestartKey] = useState(0)

  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (status === 'ON') {
      startTimeRef.current = Date.now()
    }
  }, [status])

  useEffect(() => {
    if (status === 'ON' && life <= 0) {
      dispatch(endGame())
    }
  }, [life, status, dispatch])

  useEffect(() => {
    const username = user.login

    if (status === 'END') {
      const endTime = Date.now()
      const startTime = startTimeRef.current
      const time =
        startTime !== null ? ((endTime - startTime) / 1000).toFixed(2) : '0'

      sendResultToLeaderboard({
        user: username,
        score,
        time,
      }).catch(console.error)
    }
  }, [status, score])

  return (
    <>
      {status === 'OFF' ? (
        <GameStart
          onStart={() => {
            dispatch(startGame())
            setGameRestartKey(prev => prev + 1)
          }}
        />
      ) : (
        <>
          <GameLayout key={gameRestartKey} />
          {status === 'END' && (
            <GameEnd
              score={score}
              onRestart={() => {
                dispatch(resetGame())
                dispatch(useDefaultProperties())
                dispatch(useDefaultPosition())
                setTimeout(() => {
                  dispatch(startGame())
                  setGameRestartKey(prev => prev + 1)
                }, 0)
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default GamePage
