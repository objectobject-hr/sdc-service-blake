import React from 'react';

class OverviewNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    // this.amenitiesDiv = React.createRef();
    // this.overviewDiv = React.createRef();
    // this.reviewsDiv = React.createRef();

    this.navToAmenities = this.navToAmenities.bind(this);
    this.navToOverview = this.navToOverview.bind(this);
    this.navToReviews = this.navToReviews.bind(this);
    this.navToMap = this.navToMap.bind(this);
  }


  navToAmenities() {
    var amenitiesDiv = document.getElementById('amenities');
    amenitiesDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
    // this.amenitiesDiv.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'nearest'
    // })
  }

  navToOverview() {
    var overviewDiv = document.getElementById('overview');
    overviewDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
    // this.overviewDiv.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'nearest'
    // })
  }

  navToReviews() {
    var reviewDiv = document.getElementById('mg_root')
    reviewDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
  }

  navToMap() {
    var mapDiv = document.getElementById('map-container')
    mapDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar_selections'>
          <a onClick={this.navToOverview}>Overview</a>
          <a onClick={this.navToAmenities}>Amenities</a>
          <a onClick={this.navToReviews}>Reviews</a>
          <a onClick={this.navToMap}>Map</a>
        </div>
      </div>
    )
  }
}

export default OverviewNav;