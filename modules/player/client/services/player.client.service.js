'use strict';

angular.module('player').factory('PlayerService', ['$window', function ($window) {
  return {
    createPlayer: createPlayer
  };

  function createPlayer(bookId) {
    var bookUrl = '/api/books/read/' + bookId;
    var sound = new $window.Howl({
      urls: [bookUrl],
      preload: true,
      format: 'ogg'
    });
    return sound;
  }
}]);