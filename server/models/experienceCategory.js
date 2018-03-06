const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mongoose experienceCategorySchema definition
const experienceCategorySchema = new schema({
  description: String,
  icon: String
});

const ExperienceCategories = mongoose.model('ExperienceCategories', experienceCategorySchema, 'ExperienceCategories');

module.exports = ExperienceCategories;
