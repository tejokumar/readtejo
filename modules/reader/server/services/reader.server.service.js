'use strict';

var Q = require('Q'),
  _ = require('lodash'),
  fs = require('fs'),
  probe = require('node-ffprobe'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book'),
  ReaderProfile = mongoose.model('ReaderProfile'),
  path = require('path');

exports.uploadFile = uploadFile;
exports.getBook = getBook;
exports.createBook = createBook;
exports.updateBookProperties = updateBookProperties;
exports.getAudioPathForBook = getAudioPathForBook;
exports.getBooks = getBooks;
exports.updateReaderProfile = updateReaderProfile;
exports.getBookFromProfile = getBookFromProfile;

function getBookFromProfile(userId, bookId) {
  return getReaderProfile(userId)
    .then(function (profile) {
      if (!profile) {
        return null;
      } else {
        return _.find(profile.books, { bookId: bookId });
      }
    });
}
function updateReaderProfile(userId, options) {
  var defer = Q.defer();
  getReaderProfile(userId)
    .then(function (profile) {
      if (!profile) {
        profile = createProfile(userId);
      }
      var books = profile.books;
      var book = _.find(books, { bookId: options.bookId });
      if (!book) {
        books.push(options);
      } else {
        book.currentTime = options.currentTime;
        //profile.books.pull({ bookId: options.bookId });
        //profile.books.push(options);
      }
      return profile;
    })
    .then(function (updatedProfile) {
      updatedProfile.save(function (err) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve('Success');
        }
      });
    }).catch(function (err) {
      console.log('******** Error while updating profile ' + err);
      defer.reject(err);
    });
  return defer.promise;
}
function createProfile(userId) {
  var readerProfile = new ReaderProfile({
    userId: userId,
    books: []
  });
  return readerProfile;
}
function getReaderProfile(userId) {
  var defer = Q.defer();
  ReaderProfile.findOne({ userId:userId }).exec(function (err, profile) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(profile);
    }
  });
  return defer.promise;
}
function getBooks() {
  var defer = Q.defer();
  Book.find().exec(function (err, books) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(books);
    }
  });
  return defer.promise;
}
function getAudioPathForBook(bookId) {
  var defer = Q.defer();
  var dirPath = path.resolve('.') + '/books/' + bookId + '/';
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(dirPath + _.first(files));
    }
  });
  return defer.promise;
}

function uploadFile(file, bookId) {
  var defer = Q.defer();
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
            defer.resolve({ size: probeData.format.size, duration: probeData.format.duration });
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
  Book.findOne({ bookId:bookId }).exec(function (err, book) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(book);
    }
  });
  return defer.promise;
}