'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  bookId: {
    type: String,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  accessType: {
    type: String,
    default: 'PUBLIC' // PUBLIC or PRIVATE
  }
});

mongoose.model('Book', BookSchema);