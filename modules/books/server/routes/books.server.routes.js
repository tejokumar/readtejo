'use strict';

var booksController = require('../controllers/books.server.controller.js'),
  customerController = require('../../../customer/server/controllers/customer.server.controller.js');
module.exports = function (app) {
  app.route('/api/:secretKey/books')
    .post(booksController.createBook)
    .get(booksController.getBooks);
  app.route('/api/:secretKey/books/:bookId')
    .get(booksController.getBook);
    /*
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
    */
  app.param('secretKey', customerController.hasKeyAccess);
  app.param('bookId', booksController.bookById);
};