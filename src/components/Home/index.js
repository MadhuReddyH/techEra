import Loader from 'react-loader-spinner'

import {Component} from 'react'
import Header from '../Header'
import CourseItems from '../CoursesItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, fetchedData: []}

  componentDidMount() {
    this.getTheCoursesData()
  }

  getTheCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const updateData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      this.setState({
        fetchedData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getTheCoursesData()
  }

  renderCoursesList = () => {
    const {fetchedData} = this.state

    return (
      <div className="app-bg">
        <h1 className="courses"> Courses </h1>
        <ul className="items-ul">
          {fetchedData.map(eachOf => (
            <CourseItems key={eachOf.id} courseDetails={eachOf} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader height="50" width="50" type="ThreeDots" color="#4656a1" />{' '}
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong </h1>
      <p> We cannot seem to find the page you are looking for </p>
      <button type="button" onClick={this.onRetry}>
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  renderCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesList()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        {this.renderCourses()}
      </>
    )
  }
}

export default Home
