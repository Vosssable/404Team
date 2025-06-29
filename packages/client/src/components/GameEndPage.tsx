import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './GameEndPage.css'
import Button from './Button'
import '../components/FormToFill.css'

const GameEndPage = ({ score = 120 }) => {
  return (
    <div className="game_end-background d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <div className="card custom-card overlay p-5 rounded">
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
          <Link to="/game">
            <Button className="btn btn-success btn-lg button__bgc">
              Повторить
            </Button>
          </Link>
          <Link to="/">
            <Button className="btn btn-outline-light btn-lg button__bgc">
              В меню
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameEndPage
