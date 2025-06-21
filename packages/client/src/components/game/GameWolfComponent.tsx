import { type TKeyDownResponse } from './GameInterfaces'
import changeWolfPosition from './helpers/changeWolfPosition'
import React from 'react'

type TProps = {
  positionValue: TKeyDownResponse
  layoutWidth: number
  layoutHeight: number
}

const GameWolfComponent = (props: TProps) => {
  const { positionValue, layoutWidth, layoutHeight } = props

  const wolfWidth = layoutWidth / 6,
    wolfHeight = layoutHeight / 3

  const { top, left } = changeWolfPosition(
    positionValue,
    layoutWidth,
    layoutHeight
  )

  return (
    <div
      className={`wolf-${positionValue.className}`}
      style={{
        backgroundImage: `url(${positionValue.imageUrl})`,
        width: `${wolfWidth}px`,
        height: `${wolfHeight}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
    />
  )
}

export default GameWolfComponent
