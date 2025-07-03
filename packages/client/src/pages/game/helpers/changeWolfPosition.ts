import { type TKeyDownResponseEx } from '../GameInterfaces'

const changeWolfPosition = (
  position: TKeyDownResponseEx,
  width: number,
  height: number
): { top: number; left: number } => {
  switch (position.position) {
    case 'Left':
      return { top: height / 1.5, left: width / 2.85 }
    case 'UpperLeft':
      return { top: height / 2.5, left: width / 2.98 }
    case 'UpperRight':
      return { top: height / 2.5, left: width / 2 }
    case 'Right':
      return { top: height / 1.5, left: width / 2 }
    case 'Center':
      return { top: height / 4, left: width / 2.5 }
  }
}

export default changeWolfPosition
