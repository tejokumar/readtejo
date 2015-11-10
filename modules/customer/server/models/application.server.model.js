'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  secretKey: {
    type: String,
    default: ''
  },
  createdBy: {
    type: String,
    default: ''
  },
  contributors:[]
});

mongoose.model('Application', ApplicationSchema);