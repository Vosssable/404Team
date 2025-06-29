import { type TKeyDownResponse } from '../GameInterfaces'

const onGameKeyDown = (
  e: KeyboardEvent,
  previous: string
): TKeyDownResponse | undefined => {
  switch (e.key.toLowerCase()) {
    case 'arrowup':
    case 'w':
    case 'ц':
      return checkPosition('Up', previous)
    case 'arrowleft':
    case 'a':
    case 'ф':
      return checkPosition('Left', previous)
    case 'arrowright':
    case 'd':
    case 'в':
      return checkPosition('Right', previous)
    case 'arrowdown':
    case 's':
    case 'ы':
      return checkPosition('Down', previous)
  }
}

function checkPosition(
  newPosKey: string,
  previousPos: string
): TKeyDownResponse | undefined {
  if (previousPos.includes(newPosKey)) return

  if (newPosKey === 'Center') return positionState.CENTER

  if (newPosKey === 'Up') {
    if (previousPos === 'Left') {
      return positionState.UPPERLEFT
    } else if (previousPos === 'Right') {
      return positionState.UPPERRIGHT
    } else if (previousPos === 'Center') {
      return positionState.RIGHT
    }
  } else if (newPosKey === 'Down') {
    if (previousPos === 'UpperLeft') {
      return positionState.LEFT
    } else if (previousPos === 'UpperRight') {
      return positionState.RIGHT
    } else if (previousPos === 'Center') {
      return positionState.RIGHT
    }
  } else if (newPosKey === 'Left') {
    if (previousPos === 'UpperRight') {
      return positionState.UPPERLEFT
    } else if (previousPos === 'Right') {
      return positionState.LEFT
    } else if (previousPos === 'Center') {
      return positionState.LEFT
    }
  } else if (newPosKey === 'Right') {
    if (previousPos === 'UpperLeft') {
      return positionState.UPPERRIGHT
    } else if (previousPos === 'Left') {
      return positionState.RIGHT
    } else if (previousPos === 'Center') {
      return positionState.RIGHT
    }
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

export default onGameKeyDown
