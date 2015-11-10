'use strict';

angular.module('customer').controller('CustomerController', ['$scope', 'CustomerService', function($scope, CustomerService){
  $scope.createApplication = createApplication;
  init();
  function init() {
    CustomerService.getApplications()
      .then(function(applications){
        $scope.applications = applications;
      }).catch(function(err){
        $scope.applications = [];
      });
  }
  function createApplication() {
    CustomerService.createApplication({ name:$scope.name, description:$scope.description })
      .then(function(application){
        $scope.applications.push(application);
      }).catch(function(err){
        console.log(err);
      });
  }
}]);