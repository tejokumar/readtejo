'use strict';

angular.module('customer').factory('CustomerService', ['$resource', '$q',
  function($resource, $q) {
    var ApplicationRsrc;
    function init() {
      ApplicationRsrc = $resource('api/customer/application');
    }
    init();
    function createApplication(application) {
      var defer = $q.defer();
      var Application = new ApplicationRsrc({ name: application.name, description: application.description });
      Application.$save(function(returnObject){
        defer.resolve(returnObject);
      }, function(error){
        defer.reject(error);
      });
      return defer.promise;
    }
    return {
      createApplication: createApplication
    };
  }
]);