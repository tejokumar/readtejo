'use strict';

angular.module('books').factory('BooksService', ['Upload', '$q', '$resource', 'CustomerService',
  function (Upload, $q, $resource, CustomerService){

    function createPublicBook(bookObject) {
      var defer = $q.defer();
      Upload.upload({
        url: getPublicUrl(),
        data: bookObject
      }).then(function(resp){
        defer.resolve(resp);
      }).catch(function(err){
        defer.reject(err);
      });
      return defer.promise;
    }

    function createBook(bookObject) {
      var defer = $q.defer();
      if (!CustomerService.getSecretKey()) {
        defer.reject('No Application Key');
      } else {
        Upload.upload({
          url: getUrl(CustomerService.getSecretKey()),
          data: bookObject
        }).then(function(resp){
          defer.resolve(resp);
        }).catch(function(err){
          defer.reject(err);
        });
      }
      return defer.promise;
    }

    function getBooks() {
      var defer = $q.defer();
      if (!CustomerService.getSecretKey()) {
        defer.reject('No Application Key');
      } else {
        var booksResource = $resource(getUrl(CustomerService.getSecretKey()));
        defer.resolve(booksResource.query().$promise);
      }
      return defer.promise;
    }

    function getBook(bookId) {
      var defer = $q.defer();
      if (!CustomerService.getSecretKey()) {
        defer.reject('No Application Key');
      } else {
        var booksResource = $resource(getUrl(CustomerService.getSecretKey()) + '/:bookId');
        defer.resolve(booksResource.get({ bookId: bookId }).$promise);
      }
      return defer.promise;
    }
    function getUrl(key){
      return 'api/' + key + '/books';
    }
    function getPublicUrl(){
      return 'api/books';
    }
    return {
      createPublicBook: createPublicBook,
      createBook: createBook,
      getBooks: getBooks,
      getBook: getBook
    };
  }]);
