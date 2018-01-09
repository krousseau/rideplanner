import * as RideActions from '../constants/RideActions';

const initialState = {};
export default function users(state = initialState, action) {
  switch (action.type) {
    case RideActions.FETCH_RIDES_SUCCESS:
      return action.payload;
  }
  return state;
}
