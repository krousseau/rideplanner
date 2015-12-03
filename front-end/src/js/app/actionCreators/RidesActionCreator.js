import * as Actions from '../constants/RideActions';
import axios from 'axios';

export function fetchRides() {
  return dispatch => {
    dispatch(requestRides());
    return axios.get('/api/rides/')
      .then(json => dispatch(receiveRides(json.data)))
      .catch(err => {
        dispatch(requestRidesError(err, 'SERVER_ERROR'));
      });
  };
}

function requestRides() {
  return {
    type: Actions.FETCH_RIDES_REQUEST
  };
}

function requestRidesError(error, errorType) {
  return {
    type: Actions.FETCH_RIDES_FAILURE,
    payload: {
      error: error,
      errorType: errorType
    }
  };
}

function receiveRides(response) {
  return {
    type: Actions.FETCH_RIDES_SUCCESS,
    payload: response
  };
}
