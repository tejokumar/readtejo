'use strict';

var fs = require('fs');
var probe = require('node-ffprobe');
var readerService = require('../services/reader.server.service.js');

exports.upload = upload;
exports.createBook = createBook;
exports.bookById = bookById;
exports.getBook = getBook;
exports.getAudioBook = getAudioBook;
exports.listBooks = listBooks;
exports.updateReaderProfile = updateReaderProfile;
exports.profileByBook = profileByBook;
exports.getProfileForBook = getProfileForBook;

function getProfileForBook(req, res) {
  if(req.bookProfile) {
    return res.json(req.bookProfile);
  } else {
    return res.send();
  }
}
function updateReaderProfile(req, res) {
  if (!req.user) {
    res.send('No User');
  } else {
    var userId = req.user._id;
    readerService.updateReaderProfile(userId, req.body)
      .then(function () {
        res.send('Success');
      }).catch(function (err) {
        res.status(500).send(err);
      });
  }
}
function listBooks(req, res) {
  readerService.getBooks()
    .then(function (books) {
      res.json(books);
    }).catch(function (err) {
      res.status(500).send(err);
    });
}
function upload(req, res) {
  readerService.uploadFile(req.files.audio, req.book.bookId)
    .then(function (bookProperties) {
      readerService.updateBookProperties(req.book.bookId, bookProperties)
        .then(function () {
          res.send('Successfully uploaded');
        });
    }).catch(function (err) {
      res.status(500).send('Failed to upload ' + err);
    });
}

function bookById(req, res, next, id) {
  readerService.getBook(id)
    .then(function (book) {
      req.book = book;
    }).catch(function () {
      req.book = null;
    }).finally(function () {
      next();
    });
}
function profileByBook(req, res, next, id) {
  if (!req.user) {
    next();
  } else {
    readerService.getBookFromProfile(req.user._id, id)
      .then(function (bookProfile) {
        req.bookProfile = bookProfile;
        next();
      }).catch(function (err) {
        next();
      });
  }
  
}
function createBook(req, res) {
  readerService.createBook(req.body)
    .then(function (book) {
      res.send(book);
    }).catch(function (err) {
      res.status(500).send('Failed to create book');
    });
}

function getBook(req, res) {
  res.json(req.book);
}
function getAudioBook(req, res) {
  readerService.getAudioPathForBook(req.book.bookId)
    .then(function (filePath) {
      res.download(filePath);
    }).catch(function (err) {
      res.status(500).send('Failed to load audio for bookId ' + req.book.bookId);
    });
}