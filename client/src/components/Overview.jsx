// houses icon breakdown and tags
import React from 'react';
import OverviewEntry from './OverviewEntry.jsx';
import OverviewTags from './OverviewTags.jsx';
import OverviewMap from './OverviewMap.jsx';

const Overview = (props) => {
  return (
    <div>
      <h2>Overview</h2>
      <div className="overview_section">
        <div className="overview_column">
          <OverviewEntry listing={props.currentListing} />
        </div>
        <div className="overview_column">
          <OverviewMap />
        </div>
      </div>
      <div>
        <div>
          <OverviewTags listing={props.currentListing} />
        </div>
      </div>
    </div>
  )
}

export default Overview;