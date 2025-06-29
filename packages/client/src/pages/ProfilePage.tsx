import FormToFill from '../components/FormToFill'
import { FormConfig } from '../types/formConfig'

const profileFormConfig: FormConfig = {
  description: 'Профиль',
  inputs: [
    { type: 'text', id: 'firstName', label: 'Имя', name: 'first_name' },
    { type: 'text', id: 'lastName', label: 'Фамилия', name: 'second_name' },
    { type: 'text', id: 'login', label: 'Логин', name: 'login' },
    { type: 'tel', id: 'tel', label: 'Телефон', name: 'phone' },
    { type: 'email', id: 'email', label: 'Почта', name: 'email' },
  ],
  buttonText: 'Сохранить',
  href: '/',
  linkText: 'На главную',
}

const ProfilePage = () => {
  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <FormToFill {...profileFormConfig} />
    </div>
  )
}

export default ProfilePage
