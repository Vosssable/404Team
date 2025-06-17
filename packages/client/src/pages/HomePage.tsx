import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage-background d-flex flex-column justify-content-center align-items-center text-center">
      <img
        src="/img/logo.png"
        alt="Волк ловит яйца"
        className="mb-4"
        style={{ maxWidth: '400px' }}
      />
      <h1 className="h3 fw-bold text-light mb-4">Волк ловит яйца</h1>
      <p className="lead text-light mb-5">
        Помоги волку поймать все яйца и набери рекорд!
      </p>
      <div className="d-flex gap-3">
        <Link to="/register" className="btn btn-success btn-lg startgame-btn">
          Регистрация
        </Link>
        <Link to="/forum" className="btn btn-outline-light btn-lg">
          Форум
        </Link>
      </div>
    </div>
  )
}

export default HomePage
