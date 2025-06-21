import { type TKeyDownResponse } from '../GameInterfaces'

const changeWolfPosition = (
  position: TKeyDownResponse,
  width: number,
  height: number
): { top: number; left: number } => {
  switch (position.position) {
    case 'Left':
      return { top: height / 1.8, left: width / 2.85 }
    case 'UpperLeft':
      return { top: height / 3.38, left: width / 2.98 }
    case 'UpperRight':
      return { top: height / 3.38, left: width / 2 }
    case 'Right':
      return { top: height / 1.8, left: width / 2 }
    case 'Center':
      return { top: height / 5, left: width / 2.5 }
  }
}

export default changeWolfPosition
