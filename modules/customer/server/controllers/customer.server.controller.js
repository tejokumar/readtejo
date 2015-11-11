'use strict';

exports.getApplications = getApplications;
exports.createApplication = createApplication;
exports.hasKeyAccess = hasKeyAccess;

var appService = require('../services/customer.server.service.js');
var _ = require('lodash');

function getApplications(req, res) {
  var userId = req.user._id;
  appService.getApplications(userId)
    .then(function(applications){
      res.json(applications);
    }).catch(function(err){
      res.status(500).send(err);
    });
}

function createApplication(req, res) {
  var userId = req.user._id,
    appObject = req.body;
  appObject.createdBy = userId;
  appService.createApplication(appObject)
    .then(function(application){
      res.json(application);
    }).catch(function(err){
      res.status(500).send(err);
    });
}

function hasKeyAccess(req, res, next, key) {
  req.secretKey = key;
  if (!req.user) {
    req.hasKeyAccess = false;
    next();
    return;
  }
  var userId = req.user._id;
  appService.getApplicationForKey(key)
    .then(function(application) {
      if (application && JSON.stringify(application.createdBy) === JSON.stringify(userId)) {
        req.hasKeyAccess = true;
      } else {
        req.hasKeyAccess = false;
      }
      next();
    }).catch(function(err){
      res.status(500).send(err);
    });
}