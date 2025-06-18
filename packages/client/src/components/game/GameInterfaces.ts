export interface KeyDownResponseInterface {
  position: string
  className: string
  imageUrl: string
}

export type PositionInterface =
  | 'Center'
  | 'Right'
  | 'Left'
  | 'UpperRight'
  | 'UpperLeft'

export interface LineInterface {
  start: { x: number; y: number }
  end: { x: number; y: number }
  index: PositionInterface
}

export interface EggInterface {
  line: number
  progress: number
  stage: number
  rotation: number
  x: number
  y: number
  lastUpdate: number
}
