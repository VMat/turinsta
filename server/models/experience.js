const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose experienceSchema definition
const experienceSchema = new schema({
  publication: {type: schema.Types.ObjectId, ref: 'Publications'},
  category: {type: schema.Types.ObjectId, ref: 'ExperienceCategories'},
  type: {type: schema.Types.ObjectId, ref: 'ExperienceTypes'},
  content: String,
  score: Number
});

const Experiences = mongoose.model('Experiences', experienceSchema, 'Experiences');

module.exports = Experiences;
