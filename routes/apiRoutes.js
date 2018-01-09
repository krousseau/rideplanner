'use strict';

const express = require('express');
const models = require('../models');
const Securables = require('../config/securables');
const mustbe = require('mustbe').routeHelpers();

/*eslint-disable*/
const router = express.Router();
/* eslint-enable*/

// These routes all route to /api/

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
/* eslint-disable consistent-return */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
/* eslint-enable consistent-return */

module.exports = function(app, passport) {
  // models
  const User = models.user;
  const Company = models.company;

  // router.use(ensureAuthenticated);

  router.route('/').get(
    mustbe.authorized(Securables.viewCompanies, function(req, res) {
      res.render('reactApp');
    })
  );

  router.route('/companies').get(
    mustbe.authorized(Securables.viewCompanies, function(req, res) {
      Company.findAll()
        .then(function(companies) {
          res.send(companies);
        })
        .catch(function(err) {
          res.send('error: ' + err);
        });
    })
  );

  router.route('/users').get(
    mustbe.authorized(Securables.viewUsers, function(req, res) {
      User.findAll()
        .then(function(users) {
          res.send(users);
        })
        .catch(function(err) {
          res.send('error: ' + err);
        });
    })
  );

  router.route('/rides').get(function(req, res) {
    res.send({
      1: {
        id: 1,
        name: 'TNW',
        startDate: new Date(),
        start: {
          longitude: 100,
          latitude: 120,
          name: 'Dorset Park'
        },
        length: 60,
        unit: 'mi'
      }
    });
  });

  return router;
};
