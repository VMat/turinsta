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
	experienceIds:[{type: schema.Types.ObjectId, ref: 'Experiences'}],
	commentIds:[{type: schema.Types.ObjectId, ref: 'Comments'}],
	timestamps: {
    created: String,
    modified: String
  },
  followers: [{type: schema.Types.ObjectId, "ref": 'Users'}],
  assessments: [{user:{type: schema.Types.ObjectId, "ref": 'Users'}, value: Number}],
	score: Number,
  description: String
});

const Publications = mongoose.model('Publications', publicationSchema, 'Publications');

module.exports = Publications;
