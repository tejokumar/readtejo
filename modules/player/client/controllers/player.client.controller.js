'use strict';

angular.module('player').controller('PlayerController', ['$scope', '$stateParams', 'ReaderService', 'PlayerService', function($scope, $stateParams, ReaderService, PlayerService) {
  $scope.init = init;
  $scope.play = play;

  var playerProfile;
  var sound, playing = false;
  
  function init() {
    playerProfile = undefined;
    ReaderService.getUserBookProfile($stateParams.bookId)
      .then(function (profile) {
        if (profile) {
          playerProfile = profile;
        }
      });
    sound = PlayerService.createPlayer($stateParams.bookId);
  }

  function play() {
    if (playing) {
      sound.pause();
    } else {
      sound.play();
    }
    playing = !playing;
  }
}]);