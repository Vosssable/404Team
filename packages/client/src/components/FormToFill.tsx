import React from 'react'
import Button from './Button'
import './FormToFill.css'
import { Validation } from '../hooks/Validation'
import { validationHook } from '../hooks/ValidationHook'
import { OAuthButton } from './oauth-button/OAuthButton'
import { validateInput } from '../utils/xssProtection'

type Props = {
  description: string
  inputs: { type: string; id: string; label: string; name: string }[]
  buttonText: string
  href?: string
  linkText?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  showOAuth?: boolean
}

function FormToFill(props: Props) {
  const {
    description,
    inputs,
    buttonText,
    href,
    linkText,
    onSubmit,
    showOAuth,
  } = props

  const defaultSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (!validationHook(e.currentTarget)) return
    onSubmit?.(e)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target
    const value = target.value

    // Применяем защиту от XSS при вводе
    if (target.type === 'textarea') {
      const validated = validateInput(value, 5000) // Увеличиваем лимит для textarea
      if (validated === null) {
        // Если ввод невалиден, очищаем поле
        target.value = ''
        return
      }
    }
  }

  return (
    <div className="card w-25 p-2 tofill__block">
      <div className="tofill__wrapper">
        <h2 className="text-center tofill__heading">{description}</h2>
        <form onSubmit={onSubmit ?? defaultSubmit} noValidate>
          {inputs.map(({ type, id, label, name }) => (
            <div className="mb-1" key={id}>
              <label className="form-label tofill__label" htmlFor={id}>
                {label}
              </label>
              {type === 'textarea' ? (
                <textarea
                  id={id}
                  name={name}
                  className="form-control tofill__input"
                  rows={4}
                  onChange={handleInputChange}
                  onBlur={e => {
                    // Для textarea применяем дополнительную валидацию
                    const value = e.target.value
                    const validated = validateInput(value, 5000)
                    if (validated === null) {
                      e.target.classList.add('input-error')
                    } else {
                      e.target.classList.remove('input-error')
                    }
                  }}
                />
              ) : (
                <input
                  type={type}
                  id={id}
                  name={name}
                  className="form-control tofill__input"
                  onChange={handleInputChange}
                  onBlur={e =>
                    Validation.validate(e.target as HTMLInputElement)
                  }
                />
              )}
              <span className="text-danger small"></span>
            </div>
          ))}
          <Button
            className="btn btn-primary w-100 mt-4 button__bgc"
            type="submit">
            {buttonText}
          </Button>
          {showOAuth && <OAuthButton />}
          <div className="text-center m-1">
            <a className="tofill__link" href={href}>
              {linkText}
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormToFill
