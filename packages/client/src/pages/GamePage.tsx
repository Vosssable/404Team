import { useEffect, useState } from 'react'
import GameStart from '../components/GameStart'
import GameLayout from './game/GameLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { endGame, startGame, resetGame } from '../store/gameSlice'
import GameEnd from '../components/GameEnd'
import { useDefaultProperties } from '../store/gameProperties'
import { useDefaultPosition } from '../store/wolfPosition'
import { useGameTimer } from '../hooks/useGameTimer'

const GamePage = () => {
  const dispatch = useDispatch()
  const status = useSelector((state: RootState) => state.game.status)
  const { life, score } = useSelector(
    (state: RootState) => state.gameProperties
  )

  const [gameRestartKey, setGameRestartKey] = useState(0)

  useGameTimer()

  useEffect(() => {
    if (status === 'ON' && life <= 0) {
      dispatch(endGame())
    }
  }, [life, status, dispatch])

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
