const mongoose = require('mongoose');

// Mongoose experienceSchema definition
const experienceSchema = new mongoose.Schema({
	category: String,
	content: String,
	score: Number	
});

const Experiences = mongoose.model('Experiences', experienceSchema, 'Experiences');

module.exports = Experiences;
