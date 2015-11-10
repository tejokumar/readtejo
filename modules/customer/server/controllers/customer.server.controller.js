'use strict';

exports.getApplications = getApplications;
exports.createApplication = createApplication;
var appService = require('../services/customer.server.service.js');

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