import FormToFill from '../components/FormToFill'
import { profileProps } from '../types/otherProps'

const ProfilePage = () => {
  return (
    <div className="container-fluid bg__auth vw-100 vh-100 p-0 m-0 d-flex justify-content-center align-items-center">
      <FormToFill {...profileProps} />
    </div>
  )
}

export default ProfilePage
