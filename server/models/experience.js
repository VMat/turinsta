const mongoose = require('mongoose');

// Mongoose experienceSchema definition
const experienceSchema = new mongoose.Schema({
  publication: {type: schema.Types.ObjectId, ref: 'Publications'},
	category: String,
	content: String,
	score: Number	
});

const Experiences = mongoose.model('Experiences', experienceSchema, 'Experiences');

module.exports = Experiences;
