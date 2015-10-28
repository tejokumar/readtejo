'use strict';

var readerController = require('../controllers/reader.server.controller.js');
module.exports = function (app) {
  app.route('/api/books')
    .post(readerController.createBook)
    .get(readerController.listBooks);
  app.route('/api/books/:bookId')
    .get(readerController.getBook);
  app.route('/api/books/read/:bookId')
    .get(readerController.getAudioBook);
  app.route('/api/books/upload/:bookId')
    .post(readerController.upload);

  app.route('/api/reader')
    .post(readerController.updateReaderProfile);
  app.route('/api/reader/:audioId')
    .get(readerController.getProfileForBook);
  app.param('bookId', readerController.bookById);
  app.param('audioId', readerController.profileByBook);
};