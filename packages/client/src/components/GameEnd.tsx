import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from './Button'
import '../components/FormToFill.css'

type Props = {
  score?: number
  onRestart: () => void
}

const GameEnd = ({ score = 120, onRestart }: Props) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 9999 }}>
      <div className="card custom-card p-4 rounded text-center bg-transparent border text-light">
        <h2 className="mb-4">Игра окончена!</h2>

        <img
          src="/img/power.gif"
          alt="Поздравление"
          className="mb-4"
          style={{ maxWidth: '300px' }}
        />

        <p className="lead mb-1">Ты набрал:</p>
        <h1 className="display-4 mb-4">{score} очков</h1>

        <div className="d-flex gap-4 justify-content-center">
          <Button className="btn btn-success btn-lg" onClick={onRestart}>
            Повторить
          </Button>
          <Link to="/">
            <Button className="btn btn-outline-light btn-lg">В меню</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameEnd
