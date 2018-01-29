
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose inboxSchema definition
const inboxSchema = new Schema({
  name: String,
	participants:[{type: Schema.Types.ObjectId, ref: 'Users'}],
	messages: [{
    author:{type: Schema.Types.ObjectId, ref: 'Users'},
		content: String,
    status: [{user: {type: Schema.Types.ObjectId, ref: 'Users'}, name: String, date: String}],
		timestamps: {created: String, modified: String}
  }],
  timestamps: {created: String, modified: String}
});

const Inboxes = mongoose.model('Inboxes', inboxSchema, 'Inboxes');

module.exports = Inboxes;
