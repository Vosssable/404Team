import Button from './Button'
import './FormToFill.css'

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

const formToFill = (props: Props) => {
  return (
    <div className="card w-25 p-2 tofill__block">
      <div className="tofill__wrapper">
        {props.avatarUrl && (
          <div className="text-center mb-3">
            <img
              src={props.avatarUrl}
              alt="avatar"
              className="tofill__avatar rounded-circle"
              width={100}
              height={100}
            />
          </div>
        )}
        <h2 className="text-center tofill__heading">{props.description}</h2>
        <form action="/" method="POST">
          {props.inputs.map(input => (
            <div className="mb-1" key={input.id}>
              <label className="form-label tofill__label" htmlFor={input.id}>
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                name={input.name}
                className="form-control tofill__input"
              />
            </div>
          ))}
          <Button
            className="btn btn-primary w-100 mt-4 button__bgc"
            type="submit">
            {props.buttonText}
          </Button>
          {props.href && props.linkText && (
            <div className="text-center m-1">
              <a className="tofill__link" href={props.href}>
                {props.linkText}
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default formToFill
