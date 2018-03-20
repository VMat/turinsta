const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose commentSchema definition
const commentSchema = new schema({
  publication: {type: schema.Types.ObjectId, ref: 'Publications'},
	user: {type: schema.Types.ObjectId, ref: 'Users'},
	date: String,
	content: String,
  parent: {type: schema.Types.ObjectId, ref: 'Comments'},
	replies: [{
    _id: {type: schema.Types.ObjectId, ref: 'Comments'},
    user: {type: schema.Types.ObjectId, ref: 'Users'},
	  date: String,
	  content: String
  }]
});

const Comments = mongoose.model('Comments', commentSchema, 'Comments');

module.exports = Comments;
