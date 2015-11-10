'use strict';

var customerController = require('../controllers/customer.server.controller.js');
module.exports = function(app){
  app.route('/api/customer/application')
    .get(customerController.getApplications)
    .post(customerController.createApplication);
};