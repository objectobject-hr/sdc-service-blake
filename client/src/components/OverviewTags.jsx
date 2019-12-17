import React from 'react';

const OverviewTags = ({ listing }) => {
  return (
    <div className="tag_section">
      {
        listing.tags.map((tag, index) => {
          return (
            <span className="tag" key={index}>
              {tag}
            </span>
          )
        })
      }
    </div>
  )
}

export default OverviewTags;