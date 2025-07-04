import {useState} from 'react'
import JobItems from '../JobItems'
import Profile from '../Profile'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const locationsList = [
  {label: 'Hyderabad', locationId: 'HYDERABAD'},
  {label: 'Bangalore', locationId: 'BANGALORE'},
  {label: 'Chennai', locationId: 'CHENNAI'},
  {label: 'Delhi', locationId: 'DELHI'},
  {label: 'Mumbai', locationId: 'MUMBAI'},
]

const Jobs = () => {
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
  const [selectedSalaryRange, setSelectedSalaryRange] = useState(null)
  const [selectedLocations, setSelectedLocations] = useState([])

  const handleEmploymentTypeChange = event => {
    const {value, checked} = event.target
    if (checked) {
      setSelectedEmploymentTypes([...selectedEmploymentTypes, value])
    } else {
      setSelectedEmploymentTypes(
        selectedEmploymentTypes.filter(type => type !== value),
      )
    }
  }

  const handleSalaryRangeChange = event => {
    setSelectedSalaryRange(event.target.value)
  }

  const handleLocationChange = event => {
    const {value, checked} = event.target
    console.log(value)
    if (checked) {
      setSelectedLocations([...selectedLocations, value])
    } else {
      setSelectedLocations(
        selectedLocations.filter(location => location !== value),
      )
    }
  }

  const renderEmploymentType = () => (
    <ul className="list-container">
      <h1>Type of Employment</h1>
      {employmentTypesList.map(each => (
        <li key={each.employmentTypeId} className="list-items">
          <input
            type="checkbox"
            id={each.employmentTypeId}
            value={each.employmentTypeId}
            onChange={handleEmploymentTypeChange}
          />
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
          <input
            type="radio"
            id={each.salaryRangeId}
            name="salary"
            value={each.salaryRangeId}
            onChange={handleSalaryRangeChange}
          />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  const renderLocations = () => (
    <ul className="list-container">
      <h1>Locations</h1>
      {locationsList.map(each => (
        <li key={each.locationId} className="list-items">
          <input
            type="checkbox"
            id={each.locationId}
            value={each.locationId}
            onChange={handleLocationChange}
          />
          <label htmlFor={each.locationId}>{each.label}</label>
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
          <hr />
          {renderLocations()}
        </div>
        <div className="job-display-container">
          <JobItems
            selectedEmploymentTypes={selectedEmploymentTypes}
            selectedSalaryRange={selectedSalaryRange}
            selectedLocations={selectedLocations}
          />
        </div>
      </div>
    </div>
  )
}

export default Jobs
