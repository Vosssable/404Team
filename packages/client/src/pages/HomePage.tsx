import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage-background d-flex flex-column align-items-center justify-content-center text-center min-vh-100">
      <h2 className="visually-hidden">Главная страница</h2>
      <img
        src="/img/logo.png"
        alt="Логотип игры"
        className="mb-4"
        style={{ maxWidth: '350px' }}
      />

      <h1 className="h3 mb-4 text-light">Игра "Волк ловит яйца"</h1>

      <p className="lead text-light mb-5">
        Помоги волку поймать все яйца! Заходи в игру, общайся на форуме, следи
        за достижениями и настраивай профиль.
      </p>

      <div className="container">
        <div className="row justify-content-center g-4">
          <div className="col-md-3">
            <div className="card custom-card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Играть</h5>
                <p className="card-text">
                  Начать новую игру и установить рекорд!
                </p>
                <Link to="/game" className="btn btn-light">
                  Начать игру
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card custom-card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Форум</h5>
                <p className="card-text">
                  Общайся с другими игроками и делись опытом.
                </p>
                <Link to="/forum" className="btn btn-light">
                  Перейти
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card custom-card text-center shadow">
              <div className="card-body">
                <h5 className="card-title">Таблица лидеров</h5>
                <p className="card-text">
                  Следи за результатами лучших игроков.
                </p>
                <Link to="/leaderboard" className="btn btn-light">
                  Посмотреть
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-md-3">
            <Link to="/profile" className="btn btn-outline-light btn-lg">
              Мой профиль
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
