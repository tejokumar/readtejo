'use strict';

var fs = require('fs');
var probe = require('node-ffprobe');
var readerService = require('../services/reader.server.service.js');

exports.upload = upload;
exports.createBook = createBook;
exports.bookById = bookById;

function upload(req, res) {
  readerService.uploadFile(req.files.audio, req.book.bookId)
    .then(function (bookProperties) {
      readerService.updateBookProperties(req.book.bookId, bookProperties)
        .then(function () {
          res.send('Successfully uploaded');
        })
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

function createBook(req, res) {
  readerService.createBook(req.body)
    .then(function (book) {
      res.send(book);
    }).catch(function (err) {
      res.status(500).send('Failed to create book');
    });
}