import 'bootstrap/dist/css/bootstrap.min.css'
import './GameStartPage.css'
import Button from '../components/Button'
import '../components/FormToFill.css'
import { Link } from 'react-router-dom'

const GameStartPage = () => {
  return (
    <div className="gamestart-background d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <div className="card overlay p-5 rounded">
        <h3 className="mb-4">Как играть:</h3>
        <div className="controls mb-5">
          <div className="control-row">
            <div className="key">W</div>
            <div className="key">A</div>
            <div className="key">S</div>
            <div className="key">D</div>
          </div>
          <div className="my-2">или</div>
          <div className="control-row">
            <div className="key">↑</div>
            <div className="key">←</div>
            <div className="key">↓</div>
            <div className="key">→</div>
          </div>
        </div>
        <Link to="/game">
          <Button className="btn btn-light button__bgc">Старт</Button>
        </Link>
      </div>
    </div>
  )
}

export default GameStartPage
