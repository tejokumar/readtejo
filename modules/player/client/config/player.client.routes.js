'use strict';

angular.module('player').config(['$stateProvider', function ($stateProvider) {
  // Player state routing
  $stateProvider
    .state('player', {
      abstract: true,
      url: '/player',
      template: '<ui-view/>'
    })
    .state('player.play', {
      url: '/:bookId',
      templateUrl: 'modules/player/client/views/player.client.view.html'
    });
}]);