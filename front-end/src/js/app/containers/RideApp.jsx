import React, { Component } from 'react';
import { createStore, applyMiddleware, bindActionCreators, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import masterReducer from '../reducers';
import Routes from '../routes/Routes.jsx';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(masterReducer);

export default class RideApp extends Component {
  render() {
    return (
      <Provider store={store}>
        {Routes()}
      </Provider>
    );
  }
}
