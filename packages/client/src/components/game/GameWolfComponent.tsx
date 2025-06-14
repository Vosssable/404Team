import { KeyDownResponseInterface, PositionInterface } from './GameInterfaces'
import GameWolfSprite from './GameWolfSprite'
import changeWolfPosition from '../../utils/helpers/changeWolfPosition'

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
  console.log(props.positionValue)

  return (
    <GameWolfSprite
      imageUrl={props.positionValue.imageUrl}
      className={props.positionValue.className}
      position={props.positionValue.position}
      width={width}
      height={height}
      top={top}
      left={left}
    />
  )
}

export default GameWolfComponent
