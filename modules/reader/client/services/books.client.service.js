'use strict';

angular.module('books').factory('Book', ['$resource', 
  function ($resource){
    return $resource('api/books/:bookId', {
      bookId: '@_id'
    });
  }]);