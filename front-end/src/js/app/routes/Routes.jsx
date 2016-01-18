import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import RideDetails from '../containers/RideDetails.jsx';
import RidesList from '../containers/RidesList.jsx';
import Rides from '../containers/Rides.jsx';
import AppShell from '../containers/AppShell.jsx';

export default function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={AppShell}>
        <IndexRedirect to="/rides" />
        <Route path="/rides" component={Rides}>
          <IndexRoute component={RidesList}/>
          <Route path="details/:id" component={RideDetails} />
        </Route>
      </Route>
    </Router>
  );
}
