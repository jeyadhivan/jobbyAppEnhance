import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill, BsSearch} from 'react-icons/bs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
}

class JobItems extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchQuery: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="fail-head">Oops! Something Went Wrong</h1>
      <p className="fail-para">
        We cannot seem to find the page you are looking for.
      </p>
      <div className="btn">
        <button className="retry-button" type="button">
          Retry
        </button>
      </div>
    </div>
  )

  onClickSearchIcon = () => {
    this.getJobsList()
  }

  onChangeSearchInput = event =>
    this.setState({searchQuery: event.target.value})

  renderSearchBar = () => {
    const {searchQuery} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          className="search-bar"
          value={searchQuery}
          onChange={this.onChangeSearchInput}
        />

        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  renderSuccessView = job => (
    <Link to={`jobs/${job.id}`} className="link-items" key={job.id}>
      <li>
        <div className="job-list-container">
          <div className="bg-container">
            <div className="head-card">
              <img
                src={job.companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-card">
                <h1>{job.title}</h1>
                <div className="star-card">
                  <IoIosStar className="star icon" />
                  <p>{job.rating}</p>
                </div>
              </div>
            </div>
            <div className="category-container">
              <div className="icon-container">
                <IoLocationSharp className="icon" />
                <p className="text">{job.location}</p>
              </div>
              <div className="icon-container">
                <BsFillBriefcaseFill className="icon" />
                <p className="text">{job.employmentType}</p>
              </div>
              <p>{job.packagePerAnnum}</p>
            </div>
            <hr />
            <div className="job_description">
              <h1>Description</h1>
              <p className="text">{job.jobDescription}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )

  renderPageNotFound = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-image"
      />
      <h1 className="fail-head">No Jobs Found</h1>
      <p className="fail-para">We could not find any jobs.Try other filters.</p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList, searchQuery} = this.state
    const filteredJobs = jobsList.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (filteredJobs.length === 0) {
      return <div>{this.renderPageNotFound()}</div>
    }

    return (
      <ul className="ul-container">
        {filteredJobs.map(job => this.renderSuccessView(job))}
      </ul>
    )
  }

  renderJobsListItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        {this.renderSearchBar()}

        {this.renderJobsListItem()}
      </div>
    )
  }
}
export default JobItems
