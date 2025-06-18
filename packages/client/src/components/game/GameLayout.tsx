import React, { useEffect, useState } from 'react'
import onGameKeyDown from '../../utils/helpers/onGameKeyDown'
import GameWolfComponent from './GameWolfComponent'
import { KeyDownResponseInterface } from './GameInterfaces'
import GameTest from './GameTest'
import './GameStyles.css'

let previousPosition = 'Center'

const GameLayout = () => {
  const [positionValue, changePositionValue] = useState({
    position: 'Center',
    className: 'center',
    imageUrl: '/game-wolf-center.png',
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
      if (!keyDown) return

      changePositionValue(keyDown)
      previousPosition = keyDown.position
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', handleResize)
    } //на всякий удаляем при размонтировании волчары
  }, [])

  return (
    <div id="game_wolf_layout">
      <GameWolfComponent
        positionValue={positionValue}
        layoutHeight={absValues.height}
        layoutWidth={absValues.width}
      />
      <GameTest width={absValues.width} height={absValues.height} />
    </div>
  )
}

export default GameLayout
