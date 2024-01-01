import {Compoonent} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const constants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Compoonent {
  state = {
    data: {},
    apiStatus: constants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: constants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const pageData = await response.json()
      const updatedData = {
        lastDaysVaccination: pageData.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: pageData.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        })),
        vaccinationByGender: pageData.vaccination_by_gender.map(each => ({
          gender: each.gender,
          count: each.count,
        })),
      }
      this.setState({
        data: updatedData,
        apiStatus: constants.success,
      })
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  renderData = () => {
    const {data} = this.state
    const {lastDaysVaccination, vaccinationByAge, vaccinationByGender} = data

    return (
      <div className="the-cont">
        <div className="head-cont">
          <img
            alt="website logo"
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          />
          <h1 className="head">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <VaccinationCoverage lastDaysVaccination={lastDaysVaccination} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
      </div>
    )
  }

  renderFailure = () => (
    <div className="the-cont">
      <div className="head-cont">
        <img
          alt="website logo"
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
        />
        <h1 className="head">Co-WIN</h1>
      </div>
      <h1 className="heading">CoWIN Vaccination in India</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failImg"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div className="the-cont">
      <div className="head-cont">
        <img
          alt="website logo"
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
        />
        <h1 className="head">Co-WIN</h1>
      </div>
      <h1 className="heading">CoWIN Vaccination in India</h1>
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.inProgress:
        return this.renderLoader()
      case constants.success:
        return this.renderData()
      case constants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}
export default CowinDashboard
