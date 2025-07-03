// import { type TGameStatus, TKeyDownResponseEx } from './GameInterfaces'
import changeWolfPosition from './helpers/changeWolfPosition'
import React from 'react'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

type TProps = {
  layoutWidth: number
  layoutHeight: number
  // задел на паузу
  // gameStatus: TGameStatus
}

const GameWolfComponent = (props: TProps) => {
  const { layoutWidth, layoutHeight } = props

  const position = useSelector((state: RootState) => state.wolfPosition)

  const wolfWidth = layoutWidth / 6,
    wolfHeight = layoutHeight / 3

  const { top, left } = changeWolfPosition(position, layoutWidth, layoutHeight)

  return (
    <div
      className={`wolf-${position.className}`}
      style={{
        backgroundImage: `url(${position.imageUrl})`,
        width: `${wolfWidth}px`,
        height: `${wolfHeight}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
    />
  )
}

export default GameWolfComponent
