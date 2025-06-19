import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './HomePage.css'
import HomeCard from '../components/HomeCard'
import Button from '../components/Button'
import '../components/FormToFill.css'

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
            <HomeCard
              title="Играть"
              text="Начать новую игру и установить рекорд!"
              buttonText="Начать игру"
              link="/game"
            />
          </div>

          <div className="col-md-3">
            <HomeCard
              title="Форум"
              text="Общайся с другими игроками и делись опытом."
              buttonText="Перейти"
              link="/forum"
            />
          </div>

          <div className="col-md-3">
            <HomeCard
              title="Таблица лидеров"
              text="Следи за результатами лучших игроков."
              buttonText="Посмотреть"
              link="/leaderboard"
            />
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-md-3">
            <Link to="/profile">
              <Button className="btn btn-outline-light">Мой профиль</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
