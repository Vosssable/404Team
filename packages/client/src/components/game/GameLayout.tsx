import React, { useEffect, useState } from 'react'
import onGameKeyDown from './helpers/onGameKeyDown'
import GameWolfComponent from './GameWolfComponent'
import type { TGameStatus, TKeyDownResponseEx } from './GameInterfaces'
import GameCanvasComponent from './GameCanvasComponent'
import './GameStyles.css'

let previousPosition = 'Center'

const GameLayout = () => {
  const [positionValue, changePositionValue] = useState<TKeyDownResponseEx>({
    position: 'Center',
    className: 'center',
    imageUrl: '/game-wolf-center.png',
  })

  const [absValues, setAbsValues] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [gameStatus, changeGameStatus] = useState<TGameStatus>('OFF')

  useEffect(() => {
    const handleResize = () => {
      setAbsValues({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      const keyDown = onGameKeyDown(e, previousPosition)
      if (!keyDown) return
      if (keyDown === 'PAUSE') {
        if (gameStatus === 'ON') changeGameStatus('PAUSE')
        if (gameStatus === 'PAUSE') changeGameStatus('ON')
        return
      }

      changePositionValue(keyDown)
      previousPosition = keyDown.position
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div id="game_wolf_layout">
      <GameWolfComponent
        gameStatus={gameStatus}
        positionValue={positionValue}
        layoutHeight={absValues.height}
        layoutWidth={absValues.width}
      />
      <GameCanvasComponent
        width={absValues.width}
        height={absValues.height}
        gameStatus={gameStatus}
        positionValue={positionValue}
      />
    </div>
  )
}

export default GameLayout
