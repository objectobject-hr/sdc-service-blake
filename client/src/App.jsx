// should house all components
import React from 'react'
import axios from 'axios'
import Overview from './components/Overview.jsx'
import Amenities from './components/Amenities.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentListing: null
    }

    this.randomListingId = this.randomListingId.bind(this)
  }

  randomListingId() {
    return Math.floor(Math.random() * 10000000) + 1
  }

  componentDidMount() {
    var id = this.randomListingId()
    axios
      .get('/details', { params: { listing_ID: id } })
      .then(({ data }) => {
        console.log(data)
        this.setState({ currentListing: data })
      })
      .catch(err => console.error(err))
  }

  render() {
    const loadingInfo = () => {
      if (this.state.currentListing !== null) {
        return (
          <div>
            <div id="overview">
              <Overview currentListing={this.state.currentListing} />
            </div>
            <div id="amenities">
              <Amenities currentListing={this.state.currentListing} />
            </div>
          </div>
        )
      } else {
        return <div>Loading...</div>
      }
    }
    return (
      <div>
        <div id="listing_data">{loadingInfo()}</div>
      </div>
    )
  }
}

export default App
