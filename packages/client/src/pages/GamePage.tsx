import { useState } from 'react'
import GameStart from '../components/GameStart'
import GameLayout from '../components/game/GameLayout'

export const GamePage = () => {
  const [started, setStarted] = useState(false)

  return (
    <div>
      {started ? (
        <GameLayout />
      ) : (
        <GameStart onStart={() => setStarted(true)} />
      )}
    </div>
  )
}
