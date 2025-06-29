// import { type TGameStatus, TKeyDownResponseEx } from './GameInterfaces'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

const GamePropertiesComponent = () => {
  const { score, life } = useSelector(
    (state: RootState) => state.gameProperties
  )

  return (
    <div className={'game-header'}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: 'white', marginRight: '10px' }}>Жизни:</span>
        {Array.from({ length: life }).map((_, i) => (
          <span key={i} style={{ color: 'red', marginLeft: '5px' }}>
            ❤️
          </span>
        ))}
      </div>

      <div style={{ color: 'white' }}>
        Счет: <span style={{ fontWeight: 'bold' }}>{score}</span>
      </div>
    </div>
  )
}

export default GamePropertiesComponent
