const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose captionSchema definition
const captionSchema = new Schema({
  message: [{
		language: {
			type: Schema.Types.ObjectId, ref: 'Languages'
		},
		transcription: String
	}]
});

const Captions = mongoose.model('Captions', captionSchema, 'Captions');

module.exports = Captions;
