export interface WolfSpritePropsInterface {
  imageUrl: string
  position: string
  className: string
  width?: number
  height?: number
  top?: number
  left?: number
}

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
