const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

// Mongoose productSchema definition
const publicationSchema = new mongoose.Schema({
  _id: ObjectId,
	user: {
		_id: { type: String },
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
	experienceIds:[{_id: { type: String }}],
	commentIds:[{_id: { type: String }}],
	timestamps: {
    created: String,
    modified: String
  },
	score: Number
});

Publications = mongoose.model('Publications', publicationSchema, 'Publications');

module.exports = Publications;
