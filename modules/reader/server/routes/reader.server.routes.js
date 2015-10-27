'use strict';

var readerController = require('../controllers/reader.server.controller.js');
module.exports = function (app) {
  app.route('/api/books')
    .post(readerController.createBook);
  app.route('/api/books/upload/:bookId')
    .post(readerController.upload);

  app.param('bookId', readerController.bookById);
};