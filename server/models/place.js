const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose placeSchema definition
const placeSchema = new Schema({
  name: String,
  publications:[{type: Schema.Types.ObjectId, ref: 'Publications'}]
});

const Places = mongoose.model('Placess', placeSchema, 'Placess');

module.exports = Places;
