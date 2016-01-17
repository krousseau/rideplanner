import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Ride from '../components/Ride.jsx';
import { selectRideState } from '../domain/ridesDomain';

class RidesList extends Component {
  static propTypes = {
    rides: PropTypes.object.isRequired
  };

  render() {
    const { rides } = this.props;
    const ridesList = rides.toList().map(ride => {
      const id = ride.get('id');
      return (<Ride key={id} id={id} name={ride.get('name')} />);
    });

    return (<div>
      <h2>Rides</h2>
      {ridesList}
    </div>);
  }
}
export default connect(selectRideState)(RidesList);
