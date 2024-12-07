// These are the lists used in the application. You can move them to any component needed.

import JobItems from '../JobItems'
import Profile from '../Profile'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => {
  const renderEmploymentType = () => (
    <ul className="list-container">
      <h1>Type of Employment</h1>
      {employmentTypesList.map(each => (
        <li key={each.employmentTypeId} className="list-items">
          <input type="checkbox" id={each.employmentTypeId} />
          <label htmlFor={each.employmentTypeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )
  const renderSalaryRange = () => (
    <ul className="list-container">
      <h1>Salary Range</h1>
      {salaryRangesList.map(each => (
        <li key={each.salaryRangeId} className="list-items">
          <input type="radio" id={each.salaryRangeId} name="salary" />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="jobs-bg-container">
      <Header />
      <div className="job-container">
        <div className="sidebar-container">
          <Profile />
          <hr />
          {renderEmploymentType()}
          <hr />
          {renderSalaryRange()}
        </div>
        <div className="job-display-container">
          <div>
            <JobItems />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Jobs
