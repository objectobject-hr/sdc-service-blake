// dynamically render icons and numbers
import React from 'react'
import Icon from './Icon.jsx'

const OverviewEntry = ({ listing }) => {
  return (
    <div>
      <div className="overview_entry">
        <Icon icon="fas fa-home" />
        {listing.propertyType}
      </div>
      {Object.keys(listing.overview).map((key, index) => {
        return (
          <div className="overview_entry" key={index}>
            <Icon icon={listing.overview[key].icon} />
            {key}: {listing.overview[key].data}
          </div>
        )
      })}
    </div>
  )
}

export default OverviewEntry
