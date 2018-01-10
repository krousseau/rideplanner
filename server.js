'use strict';

const cors = require('cors');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mustBe = require('mustbe');

const passportConfig = require('./config/passport');

const app = express();

app.set('port', process.env.PORT || 5000);

// (function() {
// Step 1: Create & configure a webpack compiler
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

app.use(cors());

// Step 2: Attach the dev middleware to the compiler & the server
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require('webpack-hot-middleware')(compiler));
// })();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(
  session({
    secret: 'somesecrethere',
    saveUninitialized: true,
    resave: true
  })
);

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
