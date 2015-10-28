'use strict';

angular.module('books').controller('BooksController', ['$scope', 'ReaderService', 'Book', 'ReaderProfile', '$stateParams', function ($scope, ReaderService, Book, ReaderProfile, $stateParams) {
  $scope.uploadFile = uploadFile;
  $scope.createBook = createBook;
  $scope.find = find;
  $scope.openBook = openBook;
  
  $scope.$on('$destroy', function () {
    var player = document.getElementById('player');
    player.removeEventListener('pause', onPause);
  });
  function openBook() {
    $scope.audioSource = '/api/books/read/' + $stateParams.bookId;
    var player = document.getElementById('player');
    player.addEventListener('pause', onPause);
    ReaderProfile.get({
      audioId: $stateParams.bookId
    }, function (bookProfile) {
      if (bookProfile && bookProfile.currentTime) {
        player.currentTime = bookProfile.currentTime;
      }
    });
  }
  function onPause() {
    var player = document.getElementById('player');
    var readerProfile = new ReaderProfile({
      bookId: $stateParams.bookId,
      currentTime: player.currentTime
    });
    readerProfile.$save();
  }
  function find() {
    $scope.books = Book.query();
  }
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