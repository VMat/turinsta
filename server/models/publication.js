const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose publicationSchema definition
const publicationSchema = new schema({
  user: {
		type: schema.Types.ObjectId, ref: 'Users'
	},
	places:[{
		name: String
	}],
	images:[{
		url: String
	}],
	experiences:[{type: schema.Types.ObjectId, ref: 'Experiences'}],
	comments:[{type: schema.Types.ObjectId, ref: 'Comments'}],
	timestamps: {
    created: String,
    modified: String
  },
	score: Number
});

Publications = mongoose.model('Publications', publicationSchema, 'Publications');

module.exports = Publications;
