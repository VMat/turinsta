const mongoose = require('mongoose');

// Mongoose userSchema definition
const userSchema = new mongoose.Schema({
	avatar: String,
	username: String,
	score: Number,
	publications: [],
  notifications: {
	  unseenActivities:[{
			type: Schema.Types.ObjectId, ref: 'Activities'
		}]
  }
});

const Users = mongoose.model('Users', userSchema, 'Users');

module.exports = Users;
