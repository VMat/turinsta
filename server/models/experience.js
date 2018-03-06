const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose experienceCategorySchema definition
const experienceSchema = new schema({
  publication: {type: schema.Types.ObjectId, ref: 'Publications'},
	category: String,
	content: String,
	score: Number
});

const Experiences = mongoose.model('Experiences', experienceSchema, 'Experiences');

module.exports = Experiences;
