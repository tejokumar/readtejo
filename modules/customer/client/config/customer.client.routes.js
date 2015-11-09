'use strict';
angular.module('customer').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('customer', {
        url: '/register',
        templateUrl: 'modules/customer/client/views/customer.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }]);