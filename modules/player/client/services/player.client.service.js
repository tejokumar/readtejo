'use strict';

angular.module('player').factory('PlayerService', ['$window', 'CustomerService',function ($window, CustomerService) {
  return {
    createPlayer: createPlayer
  };

  function createPlayer(bookId) {
    var bookUrl = '/api/'+ CustomerService.getSecretKey() +'/play/' + bookId;
    var sound = new $window.Howl({
      urls: [bookUrl],
      preload: true,
      format: 'ogg'
    });
    return sound;
  }
}]);