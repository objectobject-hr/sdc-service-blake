import React from 'react';
import Icon from './Icon.jsx';

const HouseRules = ({ listing }) => {
  const negOrPosIcon = (rule) => {
    if (rule.includes('No')) {
      return 'fas fa-times';
    } else {
      return 'fas fa-check';
    }
  }

  return (
    <div>
      <h4>House Rules</h4>
      <div className="check_time">
        <span className="checkin"><b>Check-in: </b>3:00PM</span>
        <span className="checkout"><b>Check-out: </b>10:00AM</span>
      </div>
      <div className="rules_container">
        <div className="rules">
          {
            listing.houseRules.rules.map((rule, index) => {
              // var iconColor = negOrPosColor(rule);
              return (
                <div className="rule" key={index}>
                  <span style={{fontSize: '18px', paddingRight: '8px'}}>
                    <i className={negOrPosIcon(rule)}></i>
                  </span>
                  {rule}
                </div>
              )
            })
          }
          <div className="rule_note">Minimum age of primary renter: {listing.houseRules.minAge}</div>
          <div className="rule_note">Max guests: {`${listing.overview.Sleeps.data} (sleeps up to ${listing.overview.Sleeps.data} adults)`}</div>
          <div className="rule_note">Maximum occupancy day or night is {listing.overview.Sleeps.data}.</div>
        </div>
      </div>
    </div>
  )
}

export default HouseRules;