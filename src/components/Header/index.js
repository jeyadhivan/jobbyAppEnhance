import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="header-bg-container">
      <li>
        <Link to="/" className="link-text">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </li>
      <li className="home-job-container">
        <Link to="/" className="link-text">
          <h1>Home</h1>
        </Link>
        <Link to="/jobs" className="link-text">
          <h1>Jobs</h1>
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="button logout-button"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)