const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose activitySchema definition
const activitySchema = new Schema({
	user:{
	  type: Schema.Types.ObjectId, ref: 'Users'
	},
	direction: String,
	caption: String,
  params: {},
	relatedUsers:[{
		type: Schema.Types.ObjectId, ref: 'Users'
	}],
	publication: {
		type: Schema.Types.ObjectId, ref: 'Publications'
	},
	timestamps: {
		created: String,
		modified: String
	},
	seen: Boolean	
});

const Activities = mongoose.model('Activities', activitySchema, 'Activities');

module.exports = Activities;
