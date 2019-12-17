// dynamically renders a type of subsection
import React from 'react';
import AmenityColumn from './AmenityColumn.jsx';

const AmenityEntries = ({ amenities }) => {
  // check length of amenities arr
  // divide the arr in two
  // render one half on one column and then other half in another column
  var middleIndex = Math.ceil(amenities.length / 2);
  var colOne = amenities.slice(0, middleIndex); // includes middleIndex
  var colTwo = amenities.slice(middleIndex); // starts at the next element pass middleIndex

  if (typeof amenities[0] === 'object') {
    return (
      <div>
        <AmenityColumn column={colOne} hasIcon={true} />
        <AmenityColumn column={colTwo} hasIcon={true} />
      </div>
    )
  } else {
    return (
      <div>
        <AmenityColumn column={colOne} hasIcon={false} />
        <AmenityColumn column={colTwo} hasIcon={false} />
      </div>
    )
  }

}

export default AmenityEntries;