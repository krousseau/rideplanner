import * as RideActions from '../constants/RideActions';
import { Map } from 'immutable';

const initialState = Map({});
export default function users(state = initialState, action) {
  switch (action.type) {
  case RideActions.FETCH_RIDES_SUCCESS:
    return state.merge(action.payload);
  }
  return state;
}
