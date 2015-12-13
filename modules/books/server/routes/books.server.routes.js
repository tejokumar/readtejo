'use strict';

var booksController = require('../controllers/books.server.controller.js'),
  customerController = require('../../../customer/server/controllers/customer.server.controller.js');
module.exports = function (app) {
  app.route('/api/:secretKey/books')
    .post(booksController.createBook)
    .get(booksController.getBooks);
  app.route('/api/:secretKey/books/:bookId')
    .get(booksController.getBook);
  app.route('/api/:secretKey/play/:bookId')
    .get(booksController.getAudio);
  app.route('/api/books')
    .post(booksController.createPublicBook)
    .get(booksController.getPublicBooks);
  app.param('secretKey', customerController.hasKeyAccess);
  app.param('bookId', booksController.bookById);
};
