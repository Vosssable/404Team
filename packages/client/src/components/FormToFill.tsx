import React from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import './FormToFill.css'
import { Validation } from '../hooks/Validation'
import { validationHook } from '../hooks/ValidationHook'
import { useAppDispatch } from '../store/storeHooks'
import { signInThunk, signUpThunk } from '../store/thunks/authThunk'

type Props = {
  description: string
  inputs: { type: string; id: string; label: string; name: string }[]
  buttonText: string
  href?: string
  linkText?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

function FormToFill(props: Props) {
  const { description, inputs, buttonText, href, linkText, onSubmit } = props
  const dispatch = useAppDispatch()
  const isRegistration = useLocation().pathname === '/register'

  const defaultSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const form = e.currentTarget
    if (!validationHook(form)) return
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >
    try {
      if (isRegistration) {
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
      } else {
        await dispatch(
          signInThunk({ login: data.login, password: data.password })
        ).unwrap()
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Неизвестная ошибка'
      alert(msg)
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
              <input
                type={type}
                id={id}
                name={name}
                className="form-control tofill__input"
                onBlur={e => Validation.validate(e.target as HTMLInputElement)}
              />
              <span className="text-danger small"></span>
            </div>
          ))}
          <Button
            className="btn btn-primary w-100 mt-4 button__bgc"
            type="submit">
            {buttonText}
          </Button>
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
