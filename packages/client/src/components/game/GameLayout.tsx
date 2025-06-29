import React, { useEffect, useState } from 'react'
import onGameKeyDown from './helpers/onGameKeyDown'
import GameWolfComponent from './GameWolfComponent'
import { type TKeyDownResponse } from './GameInterfaces'
import GameCanvasComponent from './GameCanvasComponent'
import './GameStyles.css'
import { useFullscreen } from '../../hooks/useFullscreen'

let previousPosition = 'Center'

const GameLayout = () => {
  const [positionValue, changePositionValue] = useState<TKeyDownResponse>({
    position: 'Center',
    className: 'center',
    imageUrl: '/game-wolf-center.png',
  })

  const [absValues, setAbsValues] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const { toggleFullscreen } = useFullscreen()

  useEffect(() => {
    const handleResize = () => {
      setAbsValues({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyF') {
        toggleFullscreen()
        return
      }

      e.preventDefault()
      const keyDown = onGameKeyDown(e, previousPosition)
      if (!keyDown) return

      changePositionValue(keyDown)
      previousPosition = keyDown.position
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [toggleFullscreen])

  return (
    <div id="game_wolf_layout">
      <GameWolfComponent
        positionValue={positionValue}
        layoutHeight={absValues.height}
        layoutWidth={absValues.width}
      />
      <GameCanvasComponent width={absValues.width} height={absValues.height} />
    </div>
  )
}

export default GameLayout
