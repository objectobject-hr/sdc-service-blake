// should house all components
import React from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import Amenities from './Amenities.jsx';
import OverviewNav from './OverviewNav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListing: null
    }

    this.randomListingId = this.randomListingId.bind(this);
  }

  randomListingId() {
    return Math.floor(Math.random() * (100)) + 1;
  }

  componentDidMount() {
    var id = this.randomListingId();
    axios.get(`/amenities/${id}`)
      .then(({ data }) => {
        this.setState({
          // NOTE: if you're viewing this file in the proxy,
          // this state should be set to currentListing: data
          // NOT currentListing: data[0] <-- this only works when operating
          // this module independent of the proxy
          currentListing: data[0]
        })
      })
      .catch((err) => console.log(err));
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
        return (
          <div>Loading...</div>
        )
      }
    }
    return (
      <div>
        <div id="listing_data">
          {loadingInfo()}
        </div>
      </div>
    )
  }
}

export default App;