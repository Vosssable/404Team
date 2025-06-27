import React from 'react'
import Button from './Button'
import './FormToFill.css'
import { Validation } from '../hooks/Validation'
import { validationHook } from '../hooks/ValidationHook'

type Props = {
  description: string
  inputs: {
    type: string
    id: string
    label: string
    name: string
  }[]
  buttonText: string
  href?: string
  linkText?: string
  avatarUrl?: string
}

function FormToFill({
  description,
  inputs,
  buttonText,
  href,
  linkText,
}: Props) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    validationHook(e.currentTarget)
  }

  return (
    <div className="card w-25 p-2 tofill__block">
      <div className="tofill__wrapper">
        <h2 className="text-center tofill__heading">{description}</h2>
        <form onSubmit={handleSubmit} noValidate>
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
