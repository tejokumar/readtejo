'use strict';

var Q = require('Q'),
  _ = require('lodash'),
  fs = require('fs'),
  probe = require('node-ffprobe'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book');

exports.uploadFile = uploadFile;
exports.getBook = getBook;
exports.createBook = createBook;
exports.updateBookProperties = updateBookProperties;

function uploadFile(file, bookId) {
  var defer = Q.defer();
  var path = require('path');
  var dirName = path.resolve('.') + '/books/' + bookId + '/';
  fs.stat(dirName, function (err, stats) {
    if (err || !stats.isDirectory()) {
      fs.mkdirSync(dirName);
    }
    var newPath = dirName + file.originalname;
    fs.writeFile(newPath, file.buffer, function (err) {
      if (err) {
        defer.reject('Error while uploading');
      } else {
    	
        probe(newPath, function(err, probeData) {
      	  if (err) {
            defer.reject('Error while Probing data ' + err);
      	  } else {
      	    defer.resolve({ size: probeData.format.size, duration: probeData.format.duration});
      	  }
        });
      }
    });
  });
  
  return defer.promise;
}

function updateBookProperties(bookId, properties) {
  var defer = Q.defer();
  getBook(bookId)
    .then(function (book) {
      book.size = properties.size;
      book.duration = properties.duration;
      book.save(function (err) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(book);
        }
      });
    }).catch(function (err) {
      defer.reject(err);
    });
  return defer.promise;
}
function createBook(bookObject) {
  var defer = Q.defer();
  var book = new Book(bookObject);
  book.save(function (err) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(book);
    }
  });
  return defer.promise;
}
function getBook(bookId) {
  var defer = Q.defer();
  Book.findOne( { bookId:bookId } ).exec(function (err, book) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(book);
    }
  });
  return defer.promise;
}