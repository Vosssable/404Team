import { ButtonHTMLAttributes } from 'react'

type ownProps = {
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, ...otherProps }: ownProps) => {
  return <button {...otherProps}>{children}</button>
}

export default Button
