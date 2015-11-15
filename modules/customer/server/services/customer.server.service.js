'use strict';

exports.createApplication = createApplication;
exports.getApplications = getApplications;
exports.getApplicationForKey = getApplicationForKey;

var Q = require('q'),
  _ = require('lodash'),
  uuid = require('node-uuid'),
  mongoose = require('mongoose'),
  Application = mongoose.model('Application');

function createApplication(appObject) {
  var defer = Q.defer();
  var application = new Application(appObject);
  application.secretKey = uuid.v1();
  application.save(function(err){
    if(err){
      defer.reject(err);
    } else {
      defer.resolve(application);
    }
  });
  return defer.promise;
}
function getApplicationForKey(key) {
  var defer = Q.defer();
  Application.findOne({ secretKey:key }).exec(function(err, application){
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(application);
    }
  });
  return defer.promise; 
}
function getApplications(userId) {
  var defer = Q.defer();
  Application.find({ createdBy:userId }).exec(function(err, applications){
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(applications);
    }
  });
  return defer.promise;
}