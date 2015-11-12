'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReaderProfile = new Schema({
  userId: {
    type: String,
    unique: true
  },
  books: [{
    currentTime: String,
    bookId: String
  }]
});

mongoose.model('ReaderProfile', ReaderProfile);