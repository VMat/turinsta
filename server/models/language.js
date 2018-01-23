const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose languageSchema definition
const languageSchema = new Schema({
  "name": String,
  "short": String,
  "flag": String
});

const Languages = mongoose.model('Languages', languageSchema, 'Languages');

module.exports = Languages;
