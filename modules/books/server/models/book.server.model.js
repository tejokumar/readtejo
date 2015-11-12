'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: ''
  },
  secretKey: {
    type: String,
    default: 'ALL'
  },
  title: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  category: {
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
  accessType: {
    type: String,
    default: 'PUBLIC' // PUBLIC or PRIVATE
  }
});

mongoose.model('Book', BookSchema);