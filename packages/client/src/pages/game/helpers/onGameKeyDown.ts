import type { TKeyDownResponseEx } from '../GameInterfaces'
import { setPosition } from '../../../store/wolfPosition'
import type { AppStore } from '../../../store'

const onGameKeyDown = (e: KeyboardEvent, previous: string, store: AppStore) => {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW':
      return changePosition(checkPosition('Up', previous), store)
    case 'ArrowLeft':
    case 'KeyA':
      return changePosition(checkPosition('Left', previous), store)
    case 'ArrowRight':
    case 'KeyD':
      return changePosition(checkPosition('Right', previous), store)
    case 'ArrowDown':
    case 'KeyS':
      return changePosition(checkPosition('Down', previous), store)
    // Задел на паузу
    // case 'KeyP':
    //   return 'PAUSE'
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
    imageUrl: 'images/game-wolf-moving.png',
    position: 'Left',
    className: 'left',
  },
  UPPERLEFT: {
    imageUrl: 'images/game-wolf-moving.png',
    position: 'UpperLeft',
    className: 'left',
  },
  RIGHT: {
    imageUrl: 'images/game-wolf-moving.png',
    position: 'Right',
    className: 'right',
  },
  UPPERRIGHT: {
    imageUrl: 'images/game-wolf-moving.png',
    position: 'UpperRight',
    className: 'right',
  },
  CENTER: {
    imageUrl: 'images/game-wolf-center.png',
    position: 'Center',
    className: 'center',
  },
} as const

const changePosition = (
  position: TKeyDownResponseEx | undefined,
  store: AppStore
) => {
  if (!position) return
  store.dispatch(setPosition(position))

  return position.position
}

export default onGameKeyDown
