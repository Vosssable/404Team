import type { TKeyDownResponse, TKeyDownResponseEx } from '../GameInterfaces'
import { changePositionValue } from './changeWolfPosition'

const onGameKeyDown = (
  e: KeyboardEvent,
  previous: string
): TKeyDownResponse | undefined => {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW':
      changePosition(checkPosition('Up', previous))
      return
    case 'ArrowLeft':
    case 'KeyA':
      changePosition(checkPosition('Left', previous))
      return
    case 'ArrowRight':
    case 'KeyD':
      changePosition(checkPosition('Right', previous))
      return
    case 'ArrowDown':
    case 'KeyS':
      changePosition(checkPosition('Down', previous))
      return
    case 'KeyP':
      return 'PAUSE'
  }
}

function checkPosition(
  newPosKey: string,
  previousPos: string
): TKeyDownResponseEx | undefined {
  if (previousPos.includes(newPosKey)) return

  if (newPosKey === 'Center') return positionState.CENTER

  if (newPosKey === 'Up') {
    if (previousPos === 'Left') return positionState.UPPERLEFT
    if (previousPos === 'Right') return positionState.UPPERRIGHT
    if (previousPos === 'Center') return positionState.RIGHT
  } else if (newPosKey === 'Down') {
    if (previousPos === 'UpperLeft') return positionState.LEFT
    if (previousPos === 'UpperRight') return positionState.RIGHT
    if (previousPos === 'Center') return positionState.RIGHT
  } else if (newPosKey === 'Left') {
    if (previousPos === 'UpperRight') return positionState.UPPERLEFT
    if (previousPos === 'Right') return positionState.LEFT
    if (previousPos === 'Center') return positionState.LEFT
  } else if (newPosKey === 'Right') {
    if (previousPos === 'UpperLeft') return positionState.UPPERRIGHT
    if (previousPos === 'Left') return positionState.RIGHT
    if (previousPos === 'Center') return positionState.RIGHT
  }
}

const positionState = {
  LEFT: {
    imageUrl: '/game-wolf-moving.png',
    position: 'Left',
    className: 'left',
  },
  UPPERLEFT: {
    imageUrl: '/game-wolf-moving.png',
    position: 'UpperLeft',
    className: 'left',
  },
  RIGHT: {
    imageUrl: '/game-wolf-moving.png',
    position: 'Right',
    className: 'right',
  },
  UPPERRIGHT: {
    imageUrl: '/game-wolf-moving.png',
    position: 'UpperRight',
    className: 'right',
  },
  CENTER: {
    imageUrl: '/game-wolf-moving.png',
    position: 'Center',
    className: 'center',
  },
} as const

const changePosition = (position: TKeyDownResponseEx | undefined) => {
  if (!position) return

  changePositionValue(position)
}

export default onGameKeyDown
