'use strict';

const express = require('express');
const passport = require('passport');
const passportConfig = require('./config/passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mustBe = require('mustbe');

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'somesecrethere',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// passportConfig(app, passport);

// set up mustbe
const mustBeConfig = require('./config/mustBeConfig');
mustBe.configure(mustBeConfig);

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.disable('x-powered-by');

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

require('./routes/accountRoutes')(app, passport);

const apiRoutes = require('./routes/apiRoutes')(app, passport);
app.use('/api', apiRoutes);

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
