'use strict';

angular.module('books').config(['$stateProvider', function ($stateProvider) {
  // Books state routing
  $stateProvider
    .state('books', {
      abstract: true,
      url: '/books',
      template: '<ui-view/>',
      resolve: {
        secretKey: function(CustomerService) {
          return CustomerService.loadSecretKey();
        }
      }
    })
    .state('books.create', {
      url: '/create',
      templateUrl: 'modules/books/client/views/create-book.client.view.html',
      controller: 'BooksController',
      controllerAs: 'booksCtrl'
    })
    .state('books.list', {
      url: '',
      templateUrl: 'modules/books/client/views/list-books.client.view.html',
      controller: 'BooksController',
      controllerAs: 'booksCtrl'
    });
    /*
    .state('books.view', {
      url: '/:bookId',
      templateUrl: 'modules/books/client/views/player.client.view.html'
    })
*/
}]);