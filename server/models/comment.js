const mongoose = require('mongoose');

// Mongoose commentSchema definition
const commentSchema = new mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId, ref: 'Users'
	},
	date: String,
	content: String,
	replies: [
    {type: Schema.Types.ObjectId, ref: 'Comments'}
	]
});

const Comments = mongoose.model('Comments', commentSchema, 'Comments');

module.exports = Comments;
