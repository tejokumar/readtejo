'use strict';

angular.module('player').controller('PlayerController', ['$stateParams', 'BooksService', 
  function($stateParams, BooksService) {
    var vm = this;
    vm.book = {};
  
    init();

    function init() {
      BooksService.getBook($stateParams.bookId)
        .then(function(book) {
          vm.book = book;
        });
    }
  //vm.book = resBook;
}]);
