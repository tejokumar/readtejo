'use strict';

angular.module('customer').factory('CustomerService', ['$resource', '$q',
  function($resource, $q) {
    var ApplicationRsrc, secretKey;
    function init() {
      ApplicationRsrc = $resource('api/customer/application');
      loadSecretKey();
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
    function getApplications() {
      return ApplicationRsrc.query().$promise;
    }
    function loadSecretKey() {
      if (secretKey) {
        return $q.when(secretKey);
      }
      return getApplications()
        .then(function(applications){
          if (applications && applications.length > 0) {
            secretKey = applications[0].secretKey;
            return applications[0].secretKey;
          } else {
            return undefined;
          }
        });
    }
    function getSecretKey() {
      return secretKey;
    }
    return {
      createApplication: createApplication,
      getApplications: getApplications,
      getSecretKey: getSecretKey,
      loadSecretKey: loadSecretKey
    };
  }
]);