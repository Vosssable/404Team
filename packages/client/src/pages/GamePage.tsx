import { useState } from 'react'
import GameStart from '../components/GameStart'

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
