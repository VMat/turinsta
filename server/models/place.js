const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose placeSchema definition
const placeSchema = new Schema({
  name: String,
  googlePlacesId: String,
  location: {lat: Number, lng: Number},
  publications:[{type: Schema.Types.ObjectId, ref: 'Publications'}]
});

const Places = mongoose.model('Places', placeSchema, 'Places');

module.exports = Places;
