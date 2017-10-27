const mongoose = require('mongoose');

// Mongoose productSchema definition
const publicationSchema = new mongoose.Schema({
	user: {
		_id: Number,
		avatar: String,
		username: String,
		score: Number
	},
	places:[{
		name: String
	}],
	images:[{
		url: String
	}],
	experienceIds:[{_id: Number}],	
	commentIds:[{_id: Number}],
	timestamps: {
    created: String,
    modified: String
  },
	score: Number
});

Publications = mongoose.model('Publications', publicationSchema, 'Publications');

module.exports = Publications;
