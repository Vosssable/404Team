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
  href: string
  linkText: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const formToFill = (props: Props) => {
  const { onSubmit, description, inputs, buttonText, href, linkText } = props

  return (
    <>
      <div className="card w-25 p-2 tofill__block">
        <div className="tofill__wrapper">
          <h2 className="text-center tofill__heading">{description}</h2>
          <form action="/" method="POST" onSubmit={onSubmit}>
            {inputs.map(input => (
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
    </>
  )
}

export default formToFill
