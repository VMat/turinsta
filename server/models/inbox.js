
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose placeSchema definition
const inboxSchema = new Schema({
  name: String,
  avatar: String,
	participants:[{type: Schema.Types.ObjectId, ref: 'Users'}],
	messages: [{
    author:{type: Schema.Types.ObjectId, ref: 'Users'},
		content: String,
    status: [{user: {type: Schema.Types.ObjectId, ref: 'Users'}, name: String, date: String}],
    generalState: String,
		timestamps: {created: String, modified: String}
  }],
  timestamps: {created: String, modified: String}
});

const Inboxes = mongoose.model('Inboxes', inboxSchema, 'Inboxes');

module.exports = Inboxes;
