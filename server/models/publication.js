const mongoose = require('mongoose');

// Mongoose productSchema definition
const publicationSchema = new mongoose.Schema({
  _id: String,
	user: {
		_id: String,
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
	experienceIds:[{_id: String}],	
	commentIds:[{_id: String}],
	timestamps: {
    created: String,
    modified: String
  },
	score: Number
});

Publications = mongoose.model('Publications', publicationSchema, 'Publications');

module.exports = Publications;
