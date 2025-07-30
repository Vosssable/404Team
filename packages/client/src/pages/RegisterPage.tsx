import './RegisterPage.css'
import FormToFill from '../components/FormToFill'
import { FormConfig } from '../types/formConfig'
import { useNavigate } from 'react-router-dom'
import { signUpThunk } from '../store/thunks/authThunk'
import { useAppDispatch } from '../store/storeHooks'
import { validationHook } from '../hooks/ValidationHook'

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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!validationHook(form)) return
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >
    try {
      await dispatch(
        signUpThunk({
          first_name: data.first_name,
          second_name: data.second_name,
          login: data.login,
          email: data.email,
          password: data.password,
          phone: data.phone,
        })
      ).unwrap()
      navigate('/')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка регистрации')
    }
  }

  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <FormToFill
        {...registerFormConfig}
        onSubmit={handleSubmit}
        showOAuth={true}
      />
    </div>
  )
}

export default RegisterPage
