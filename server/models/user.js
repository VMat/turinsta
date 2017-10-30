const mongoose = require('mongoose');

// Mongoose userSchema definition
const userSchema = new mongoose.Schema({
	avatar: String,
	username: String,
	score: Number,
	publicationIds: []
});

const Users = mongoose.model('Users', userSchema, 'Users');

module.exports = Users;
