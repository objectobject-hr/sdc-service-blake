// houses all subsections of amenities
// featured, safety features, location type, house rules, etc.
import React from 'react';
import AmenityEntries from './AmenityEntries.jsx';
import HouseRules from './HouseRules.jsx'

const Amenities = ({ currentListing }) => {
  return (
    <div>
      <div>
        <h2>Amenities</h2>
          {
            Object.keys(currentListing.amenities).map((key, index) => {
              return (
                <div key={index} className="subcat_container">
                  <h4>{key}</h4>
                  <AmenityEntries key={index} index={index} amenities={currentListing.amenities[key]}/>
                </div>
              )
            })
          }
      </div>
      <div className="house_rules">
        <HouseRules listing={currentListing} />
        <div className="cancel_policy">
          <h4>Cancellation Policy</h4>
          <div className="cancel_text">
            100% refund if canceled at least 60 days before arrival date. 50% refund if canceled at least 30 days before arrival date.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Amenities;