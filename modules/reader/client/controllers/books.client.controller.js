'use strict';

angular.module('books').controller('BooksController', ['$scope', '$window', 'ReaderService', 'Book', 'ReaderProfile', '$stateParams', function ($scope, $window, ReaderService, Book, ReaderProfile, $stateParams) {
  $scope.uploadFile = uploadFile;
  $scope.createBook = createBook;
  $scope.find = find;
  $scope.openBook = openBook;
  $scope.openPlayer = openPlayer;
  $scope.playHowl = playHowl;
  var sound, playing = false;

  $scope.$on('$destroy', function () {
    var player = document.getElementById('player');
    player.removeEventListener('pause', onPause);
  });
  init();
  function init() {
    sound = new $window.Howl({
      urls: ['/api/books/read/DUMMY'],
      preload: true,
      format: 'ogg'
    });
    sound.load();
    sound.on('load', function () {
      console.log('Loaded');
    });
    sound.on('loaderror', function (id, error) {
      console.log(error);
    });
  }
  function playHowl() {
    if (playing) {
      sound.pause();
    } else {
      sound.play();
    }
    playing = !playing;
  }
  function openPlayer() {
    $window.open('//facebook.com');
  }
  function openBook() {
    //$scope.audioSource = '/api/books/read/' + $stateParams.bookId;
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