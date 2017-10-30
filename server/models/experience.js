
const mongoose = require('mongoose');

// Mongoose experienceSchema definition
const experienceSchema = new mongoose.Schema({
	category: String,
	content: String,
	score: Number	
});

Experiences = mongoose.model('Experiences', userSchema, 'Experiences');

module.exports = Experiences;
