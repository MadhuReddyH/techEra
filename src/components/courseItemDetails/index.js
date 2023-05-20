import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, itemsData: []}

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      const updateData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        itemsData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getItems()
  }

  renderOnSuccessful = () => {
    const {itemsData} = this.state
    const {name, imageUrl, description} = itemsData

    return (
      <div className="items-bg items-card">
        <div>
          <img className="items-img" src={imageUrl} alt={name} />
        </div>
        <div>
          <h1 className="items-heading"> {name}</h1>
          <p className="items-desc">{description}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader height="50" width="50" type="ThreeDots" color="#4656a1" />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong </h1>
      <p> We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetry}>
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  renderItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOnSuccessful()
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
        {this.renderItemDetails()}
      </>
    )
  }
}

export default ItemDetails
