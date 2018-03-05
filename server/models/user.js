const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose userSchema definition
const userSchema = new schema({
	avatar: String,
	username: String,
	score: Number,
	publications: [{
  			type: schema.Types.ObjectId, ref: 'Publications'
  }],
  notifications: {
	  unseenActivities:[{
			type: schema.Types.ObjectId, ref: 'Activities'
		}],
    unreadMessages:[{
      inbox: {type: schema.Types.ObjectId, ref: 'Places'},
      messages: []
    }]
  },
  favorites: [{type: schema.Types.ObjectId, "ref": 'Publications'}],
  followers: [{type: schema.Types.ObjectId, "ref": 'Users'}],
  followedes: [{type: schema.Types.ObjectId, "ref": 'Users'}],
  bucketId: String,
  notificationKey: String,
  language: {type: schema.Types.ObjectId, ref: 'Language'}
});

const Users = mongoose.model('Users', userSchema, 'Users');

module.exports = Users;
