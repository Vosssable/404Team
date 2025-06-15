import './RegisterPage.css'
import FormToFill from '../components/FormToFill'

const props = {
  description: 'Вход',
  inputs: [
    { type: 'text', id: 'login', label: 'Логин', name: 'login' },
    { type: 'password', id: 'password', label: 'Пароль', name: 'password' },
  ],
  buttonText: 'Войти',
  href: '/register',
  linkText: 'Еще не зарегистрированы?',
}

const LoginPage = () => {
  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <FormToFill {...props} />
    </div>
  )
}

export default LoginPage
