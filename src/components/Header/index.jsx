import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true }) // replaces history
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

export default Header
