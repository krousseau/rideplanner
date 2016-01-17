import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRides } from '../actionCreators/RidesActionCreator';
import PureComponent from 'react-pure-render/component';
import { selectRideState } from '../domain/ridesDomain';

class Rides extends PureComponent {

  componentDidMount() {
    const { dispatch, rides } = this.props;

    // Only fetch if we have not done so yet
    if (rides.size === 0) {
      dispatch(fetchRides());
    }
  }

  render() {
    const { dispatch, enterpriseContext, rides } = this.props;
    return (<div>
      {this.props.children}
    </div>);
  }
}
export default connect(selectRideState)(Rides);
