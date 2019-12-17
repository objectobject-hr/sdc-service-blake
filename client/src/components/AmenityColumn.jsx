import React from 'react';
import Icon from './Icon.jsx';

const AmenityColumn = ({ column, hasIcon }) => {
  if (hasIcon) {
    return (
      <div className="column">
        {
          column.map((amenity, index) => {
            return (
              <div key={index} className="amenity_entry">
                <Icon icon={amenity.icon} />
                {amenity.data}
              </div>
            )
          })
        }
      </div>
    )
  } else {
    return (
      <div className="column">
        {
          column.map((amenity, index) => {
            return (
              <div key={index} className="amenity_entry">
                {amenity}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default AmenityColumn;