'use strict';

angular.module('books').config(['$stateProvider', function ($stateProvider) {
  // Books state routing
  $stateProvider
    .state('books', {
      abstract: true,
      url: '/books',
      template: '<ui-view/>'
    })
    .state('books.list', {
      url: '',
      templateUrl: 'modules/reader/client/views/list-books.client.view.html'
    })
    .state('books.create', {
      url: '/create',
      templateUrl: 'modules/reader/client/views/upload-book.client.view.html'
    })
    .state('books.view', {
      url: '/:bookId',
      templateUrl: 'modules/reader/client/views/player.client.view.html'
    });
}]);