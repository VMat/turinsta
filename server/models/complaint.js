const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose complaintSchema definition
const complaintSchema = new Schema({
  reporter:{
    type: Schema.Types.ObjectId, ref: 'Users'
  },
  reported:{
    type: Schema.Types.ObjectId, ref: 'Users'
  },
  publication: {
    type: Schema.Types.ObjectId, ref: 'Publications'
  },
  timestamps: {
    created: String,
    modified: String
  },
  checked: Boolean
});

const Complaints = mongoose.model('Complaints', complaintSchema, 'Complaints');

module.exports = Complaints;
