import 'bootstrap/dist/css/bootstrap.min.css'
import './GameStart.css'
import Button from './Button'
import '../components/FormToFill.css'

type Props = {
  onStart: () => void
}

const GameStart = ({ onStart }: Props) => {
  return (
    <div
      className="bg-overlay d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      style={{ backgroundImage: "url('/img/background.jpg')" }}>
      <div className="card overlay-card custom-card overlay p-5 rounded">
        <h3 className="mb-4">Как играть:</h3>
        <div className="controls mb-5">
          <div className="control-row">
            <div>W</div>
            <div>A</div>
            <div>S</div>
            <div>D</div>
          </div>
          <div className="my-2">или</div>
          <div className="control-row">
            <div>↑</div>
            <div>←</div>
            <div>↓</div>
            <div>→</div>
          </div>
        </div>
        <Button className="btn btn-light button__bgc" onClick={onStart}>
          Старт
        </Button>
      </div>
    </div>
  )
}

export default GameStart
