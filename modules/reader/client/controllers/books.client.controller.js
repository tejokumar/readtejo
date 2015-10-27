'use strict';

angular.module('books').controller('BooksController', ['$scope', 'ReaderService', 'Book', function ($scope, ReaderService, Book) {
  $scope.uploadFile = uploadFile;
  $scope.createBook = createBook;

  function reset() {
    $scope.file = null;
    $scope.title = '';
    $scope.summary = '';
    $scope.author = '';
  }

  function uploadFile() {
    var audioFile = $scope.file;
    ReaderService.uploadFile(audioFile, $scope.bookId)
      .then(function () {
        reset();
        $scope.message = 'Success';
      }).catch (function (err) {
        $scope.message = err;
      });
  }

  function createBook() {
    var book = new Book({
      bookId: $scope.bookId,
      title: $scope.title,
      author: $scope.author,
      summary: $scope.summary
    });

    book.$save(function (book) {
      reset();
      $scope.message = 'Success';
    }, function (err) {
      $scope.message = err;
    });
  }
  
}]);