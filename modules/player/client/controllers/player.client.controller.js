'use strict';

angular.module('player').controller('PlayerController', ['$stateParams', 'BooksService', 'PlayerService',
  function($stateParams, BooksService, PlayerService) {
    var vm = this;
    vm.book = {};
    vm.play = play;
    vm.pause = pause;
    vm.currentPlayTime = 0;
    var player;
    init();

    function init() {
      BooksService.getBook($stateParams.bookId)
        .then(function(book) {
          vm.book = book;
        });
      player = PlayerService.createPlayer($stateParams.bookId);
      if (player) {
        player.on('play', function() {
          vm.currentPlayTime = player.pos();
        });
        player.on('pause', function() {
          vm.currentPlayTime = player.pos();
        });
      }
    }
    function play() {
      if (player) {
        player.play();
      }
    }
    function pause() {
      if (player) {
        player.pause();
      }
    }
  //vm.book = resBook;
  }
]);
