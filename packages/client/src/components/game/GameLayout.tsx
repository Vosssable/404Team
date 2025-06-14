import React, { useEffect, useState } from 'react'
import './GameStyles.css'
import onGameKeyDown from '../../utils/helpers/onGameKeyDown'
import GameWolfComponent from './GameWolfComponent'
import { KeyDownResponseInterface } from './GameInterfaces'

let previousPosition = 'Center'

const GameLayout = () => {
  const [positionValue, changePositionValue] = useState({
    position: 'Center',
    className: 'center',
    imageUrl: '/Default.png',
  } as KeyDownResponseInterface)

  const [absValues, setAbsValues] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

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
      console.log('keyDown', keyDown, previousPosition)
      if (!keyDown) return

      changePositionValue(keyDown)
      previousPosition = keyDown.position
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', handleResize)
    } //на всякий удаляем при размонтировании волка
  }, [])

  return (
    <div id="game_wolf_layout">
      <GameWolfComponent
        positionValue={positionValue}
        layoutHeight={absValues.height}
        layoutWidth={absValues.width}
      />
      <canvas
        id="game_canvas_layout"
        style={{
          width: `${absValues.width}px`,
          height: `${absValues.height}px`,
        }}></canvas>
    </div>
  )
}

export default GameLayout
