const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose userSchema definition
const userSchema = new Schema({
	avatar: String,
	username: String,
	score: Number,
	publications: [{
  			type: Schema.Types.ObjectId, ref: 'Publications'
  }],
  notifications: {
	  unseenActivities:[{
			type: Schema.Types.ObjectId, ref: 'Activities'
		}]
  },
  favorites: [{type: schema.Types.ObjectId, "ref": 'Publications'}],
  followers: [{type: schema.Types.ObjectId, "ref": 'Users'}],
  followedes: [{type: schema.Types.ObjectId, "ref": 'Users'}]
});

const Users = mongoose.model('Users', userSchema, 'Users');

module.exports = Users;
