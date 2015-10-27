'use strict';

angular.module('books').factory('ReaderService', ['Upload', '$q',
  function (Upload, $q) {
    return {
    	uploadFile: uploadFile
    };

  function uploadFile(audioFile, bookId) {
  	var defer = $q.defer();
    Upload.upload({
      url: '/api/books/upload/' + bookId,
      data: { audio: audioFile}
    }).then(function () {
      defer.resolve();
    }).catch(function (err) {
      defer.reject(err);
    });
    return defer.promise;
  }
}]);