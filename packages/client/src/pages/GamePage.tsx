import { useState } from 'react'
import GameStart from '../components/GameStart'

export const GamePage = () => {
  const [started, setStarted] = useState(false)

  return (
    <div>
      {started ? (
        <div>
          <h1>Страница игры</h1>
        </div>
      ) : (
        <GameStart onStart={() => setStarted(true)} />
      )}
    </div>
  )
}
