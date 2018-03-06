const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose experienceCategorySchema definition
const experienceTypeSchema = new schema({
  description: String,
  color: String,
  icon: String
});

const ExperienceTypes = mongoose.model('ExperienceTypes', experienceTypeSchema, 'ExperienceTypes');

module.exports = ExperienceTypes;
