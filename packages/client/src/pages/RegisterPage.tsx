import './RegisterPage.css'
import FormToFill from '../components/FormToFill'
import { registerProps } from '../types/otherProps'

const RegisterPage = () => {
  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <FormToFill {...registerProps} />
    </div>
  )
}

export default RegisterPage
