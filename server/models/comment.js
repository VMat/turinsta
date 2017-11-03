const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose commentSchema definition
const commentSchema = new schema({
	user: {
	  id: {type: schema.Types.ObjectId, ref: 'Users'},
    name: String,
	  avatar: String
  },
	date: String,
	content: String,
	replies: [
    {type: schema.Types.ObjectId, ref: 'Comments'}
	]
});

const Comments = mongoose.model('Comments', commentSchema, 'Comments');

module.exports = Comments;
