import React, { useRef, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/storeHooks'
import { getUserThunk } from '../store/thunks/authThunk'
import Button from '../components/Button'
import axios from '../axios'
import '../components/FormToFill.css'
import { validateInput } from '../utils/xssProtection'

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  const [form, setForm] = useState({
    first_name: '',
    second_name: '',
    login: '',
    phone: '',
    email: '',
    password: '',
    newPassword: '',
  })

  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showNewPassword, setShowNewPassword] = useState(false)

  useEffect(() => {
    setForm(f => ({
      ...f,
      first_name: user.first_name || '',
      second_name: user.second_name || '',
      login: user.login || '',
      phone: user.phone || '',
      email: user.email || '',
    }))
    setAvatarPreview(user.avatar)
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Применяем защиту от XSS при вводе
    const validated = validateInput(value, 100)
    if (validated !== null) {
      setForm({ ...form, [name]: validated })
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => {
        setAvatarPreview(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
      // TODO: Загрузка аватара на сервер
    }
  }

  const updateUserProfile = async () => {
    try {
      // Валидируем все поля перед отправкой
      const validatedForm: Record<string, string> = {}

      for (const [key, value] of Object.entries(form)) {
        if (value) {
          const validated = validateInput(value, 100)
          if (validated !== null) {
            validatedForm[key] = validated
          }
        }
      }

      const payload = {
        ...validatedForm,
        ...(validatedForm.newPassword
          ? { new_password: validatedForm.newPassword }
          : {}),
      }

      await axios.put('/user/profile', payload)
      await dispatch(getUserThunk())
      alert('Профиль успешно обновлён')
    } catch (error) {
      console.error(error)
      alert('Ошибка при обновлении профиля')
    }
  }

  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <form
        className="card tofill__block p-4 mb-3 d-flex flex-column align-items-center"
        style={{
          width: '100%',
          maxWidth: 500,
          minWidth: 300,
          minHeight: 400,
          height: 'auto',
        }}
        onSubmit={e => {
          e.preventDefault()
          updateUserProfile()
        }}>
        <div className="mb-3 position-relative">
          <img
            src={avatarPreview || '/default-avatar.png'}
            alt="avatar"
            className="rounded-circle border"
            style={{ width: 100, height: 100, objectFit: 'cover' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          <button
            className="btn btn-sm btn-secondary position-absolute"
            style={{ bottom: 0, right: 0 }}
            onClick={e => {
              e.preventDefault()
              fileInputRef.current?.click()
            }}
            type="button">
            Изменить
          </button>
        </div>
        <div className="w-100">
          <div className="mb-2">
            <label className="form-label">Имя</label>
            <input
              className="form-control"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Фамилия</label>
            <input
              className="form-control"
              name="second_name"
              value={form.second_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Логин</label>
            <input
              className="form-control"
              name="login"
              value={form.login}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Телефон</label>
            <input
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Почта</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {showNewPassword && (
            <>
              <div className="mb-2">
                <label className="form-label">Старый пароль</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Новый пароль</label>
                <input
                  className="form-control"
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="mb-2">
            {!showNewPassword && (
              <Button
                type="button"
                className="btn btn-outline-primary w-100 button__bgc"
                onClick={() => setShowNewPassword(true)}>
                Изменить пароль
              </Button>
            )}
          </div>
          <Button
            type="submit"
            className="btn btn-primary w-100 mt-2 button__bgc">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage
