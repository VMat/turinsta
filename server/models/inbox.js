
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose inboxSchema definition
const inboxSchema = new Schema({
	participants:[{type: Schema.Types.ObjectId, ref: 'Users'}],
	messages: [{
    author:{type: Schema.Types.ObjectId, ref: 'Users'},
		content: String,
    state: String,
		timestamps: {created: String, modified: String}
  }]		
});

const Inboxes = mongoose.model('Inboxes', inboxSchema, 'Inboxes');

module.exports = Inboxes;
