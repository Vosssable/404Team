import { Link } from 'react-router-dom'
import Button from './Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/FormToFill.css'

interface HomeCardProps {
  title: string
  text: string
  buttonText: string
  link: string
}

export default function HomeCard({
  title,
  text,
  buttonText,
  link,
}: HomeCardProps) {
  return (
    <div className="card custom-card text-center shadow">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <Link to={link}>
          <Button className="btn btn-light button__bgc">{buttonText}</Button>
        </Link>
      </div>
    </div>
  )
}
