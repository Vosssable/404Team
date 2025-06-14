import React from 'react'
import { WolfSpritePropsInterface } from './GameInterfaces'

export const GameWolfSprite = ({
  imageUrl,
  className = '',
  width,
  height,
  top,
  left,
}: WolfSpritePropsInterface) => {
  return (
    <div
      className={`wolf-${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
    />
  )
}

export default GameWolfSprite
