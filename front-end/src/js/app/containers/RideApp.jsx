import React, { Component } from 'react';
import { createStore, applyMiddleware, bindActionCreators, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute } from 'react-router';
import masterReducer from '../reducers';
import RidesList from './RidesList.jsx';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(masterReducer);

export default class RideApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={AppShell}>
            <IndexRoute component={RidesList}/>
            <Route path="/rides" component={RidesList}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

class AppShell extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
