'use strict';

angular.module('books').controller('BooksController', BooksController);

BooksController.$inject = ['$state', 'CustomerService', 'BooksService'];

function BooksController($state, CustomerService, BooksService) {
  var vm = this;
  vm.createBook = createBook;
  vm.hasSecretKey = false;
  vm.books = [];
  vm.newBook = {};

  init();
  var secretKey;
  function init() {
    if (CustomerService.getSecretKey()) {
      secretKey = CustomerService.getSecretKey();
      vm.hasSecretKey = true;
      loadBooks();
    }
  }
  function loadBooks() {
    BooksService.getBooks()
      .then(function(books){
        vm.books = books;
      });
  }
  function createBook() {
    var bookObject = {
      audioFile: vm.newBook.audioFile,
      title: vm.newBook.title,
      summary: vm.newBook.summary,
      author: vm.newBook.author,
      category: vm.newBook.category
    };
    BooksService.createBook(bookObject)
      .then(function() {
        $state.go('books.list');
      });
  }
}