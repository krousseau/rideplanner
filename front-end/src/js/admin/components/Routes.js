import React from 'react';
import {Route} from 'react-router';
import App from 'components/App.jsx';
import Home from 'components/Home.jsx';
import Users from 'components/UserList.jsx';


export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/users" component={Users}/>
    </Route>
  </Router>
);
