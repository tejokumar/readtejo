'use strict';

angular.module('customer').controller('CustomerController', ['$scope', 'CustomerService', function($scope, CustomerService){
  $scope.createApplication = createApplication;
  
  function createApplication() {
    CustomerService.createApplication({ name:$scope.name, description:$scope.description })
      .then(function(application){
        console.log('Created application');
      }).catch(function(err){
        console.log(err);
      });
  }
}]);