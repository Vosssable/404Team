import './RegisterPage.css'
import FormToFill from '../components/FormToFill'
import { FormConfig } from '../types/formConfig'

const registerFormConfig: FormConfig = {
  description: 'Регистрация',
  inputs: [
    { type: 'text', id: 'name', label: 'Имя', name: 'first_name' },
    { type: 'text', id: 'firstName', label: 'Фамилия', name: 'second_name' },
    { type: 'text', id: 'login', label: 'Логин', name: 'login' },
    { type: 'tel', id: 'tel', label: 'Номер телефона', name: 'phone' },
    { type: 'email', id: 'email', label: 'Почта', name: 'email' },
    { type: 'password', id: 'password', label: 'Пароль', name: 'password' },
    {
      type: 'password',
      id: 'retryPassword',
      label: 'Повторите пароль',
      name: 'retryPassword',
    },
  ],
  buttonText: 'Зарегистрироваться',
  href: '/login',
  linkText: 'Войти',
}

const RegisterPage = () => {
  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <FormToFill {...registerFormConfig} />
    </div>
  )
}

export default RegisterPage
