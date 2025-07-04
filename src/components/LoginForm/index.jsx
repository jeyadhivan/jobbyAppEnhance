import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" />
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitFailure = msg => {
    setErrorMsg(msg)
    setShowErrorMessage(true)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-bg-container">
      <div className="form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <form onSubmit={onSubmitForm}>
          <label htmlFor="username" className="label">USERNAME</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="label">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="button">Login</button>
          {showErrorMessage && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
