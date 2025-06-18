import { KeyDownResponseInterface, PositionInterface } from './GameInterfaces'
import changeWolfPosition from '../../utils/helpers/changeWolfPosition'
import React from 'react'

interface WolfProps {
  positionValue: KeyDownResponseInterface
  layoutWidth: number
  layoutHeight: number
}

const GameWolfComponent = (props: WolfProps) => {
  const width = props.layoutWidth / 6,
    height = props.layoutHeight / 3,
    { top, left } = changeWolfPosition(
      props.positionValue.position as PositionInterface,
      props.layoutWidth,
      props.layoutHeight
    )

  return (
    <div
      className={`wolf-${props.positionValue.className}`}
      style={{
        backgroundImage: `url(${props.positionValue.imageUrl})`,
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
    />
  )
}

export default GameWolfComponent
