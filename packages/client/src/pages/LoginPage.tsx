import './RegisterPage.css'
import FormToFill from '../components/FormToFill'
import { FormConfig } from '../types/formConfig'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/storeHooks'
import { getUserThunk, signInThunk } from '../store/thunks/authThunk'
import { sanitizeFormData } from '../utils/xssProtection'

const loginFormConfig: FormConfig = {
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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >

    // Применяем защиту от XSS
    const sanitizedData = sanitizeFormData(formData)

    try {
      await dispatch(
        signInThunk({
          login: sanitizedData.login,
          password: sanitizedData.password,
        })
      ).unwrap()
      await dispatch(getUserThunk())
      navigate('/')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка авторизации')
    }
  }

  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <FormToFill
        {...loginFormConfig}
        onSubmit={handleSubmit}
        showOAuth={true}
      />
    </div>
  )
}

export default LoginPage
