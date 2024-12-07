import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const onClickFindJobsButton = () => {}
  return (
    <>
      <div className="home-container">
        <Header />
        <div className="container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the jsob that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="button"
              onClick={onClickFindJobsButton}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
