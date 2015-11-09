'use strict';

angular.module('books').factory('ReaderService', ['Upload', '$q', 'ReaderProfile',
  function (Upload, $q, ReaderProfile) {
    return {
      uploadFile: uploadFile,
      getUserBookProfile: getUserBookProfile
    };

    function uploadFile(audioFile, bookId) {
      var defer = $q.defer();
      Upload.upload({
        url: '/api/books/upload/' + bookId,
        data: { audio: audioFile }
      }).then(function () {
        defer.resolve();
      }).catch(function (err) {
        defer.reject(err);
      });
      return defer.promise;
    }

    function getUserBookProfile(bookId) {
      var defer = $q.defer();
      ReaderProfile.get({
        audioId: bookId
      }, function (bookProfile) {
        defer.resolve(bookProfile);
      });
      return defer.promise;
    }
  }]);