'use strict';

angular.module('books').factory('ReaderProfile', ['$resource', 
  function ($resource){
    return $resource('api/reader/:audioId', {
      audioId: '@_id'
    });
  }]);