import React, { useEffect, useState } from 'react'
import onGameKeyDown from './helpers/onGameKeyDown'
import GameWolfComponent from './GameWolfComponent'
import GameCanvasComponent from './GameCanvasComponent'
import GamePropertiesComponent from './GamePropertiesComponent'
import './GameStyles.css'
import { useFullscreen } from '../../hooks/useFullscreen'

let previousPosition = 'Center'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const GameLayout = () => {
  const status = useSelector((state: RootState) => state.game.status)

  const [previousPosition, setPreviousPosition] = useState('Center')

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

      const newPosition = onGameKeyDown(e, previousPosition)
      if (!newPosition || previousPosition === newPosition) return

      setPreviousPosition(newPosition)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [toggleFullscreen,previousPosition])

  return (
    <div id="game_wolf_layout">
      <GamePropertiesComponent />
      <GameWolfComponent
        layoutHeight={absValues.height}
        layoutWidth={absValues.width}
      />
      <GameCanvasComponent
        width={absValues.width}
        height={absValues.height}
        isPaused={status !== 'ON'}
      />
    </div>
  )
}

export default GameLayout
