export const loginProps = {
  description: 'Вход',
  inputs: [
    { type: 'text', id: 'login', label: 'Логин', name: 'login' },
    { type: 'password', id: 'password', label: 'Пароль', name: 'password' },
  ],
  buttonText: 'Войти',
  href: '/register',
  linkText: 'Еще не зарегистрированы?',
}

export const registerProps = {
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
