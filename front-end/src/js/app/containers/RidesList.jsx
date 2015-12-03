import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRides } from '../actionCreators/RidesActionCreator';
import Ride from '../components/Ride.jsx';

function selectState(state) {
  return {
    rides: state.rides
  };
}

class RidesList extends Component {
  static propTypes = {
    rides: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, rides } = this.props;

    // Only fetch if we have not done so yet
    if (rides.size === 0) {
      dispatch(fetchRides());
    }
  }

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
export default connect(selectState)(RidesList);
