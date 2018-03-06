const Publications = require('../models/publication');
const Experiences = require('../models/experience');
const Categories = require('../models/experienceCategory');
const Types = require('../models/experienceType');
const Commons = require('./commons');

let ExperienceInterface = {};

ExperienceInterface.getOne = (id)=>{
  return Commons.getOne(Experiences, id)
    .populate('category')
    .populate('type')
};

ExperienceInterface.getCategories = ()=>{
  return Commons.getAll(Categories);
};

ExperienceInterface.getTypes = ()=>{
  return Commons.getAll(Types);
};

ExperienceInterface.insert = (experience)=>{
  experience.score = 0;
  return Commons.insert(new Experiences(experience))
    .then(insertedExperience=>{
      return Commons.getOne(Publications, insertedExperience.publication)
        .then(publication=>{
          publication.experienceIds.push(insertedExperience._id);
          publication.timestamps.modified = new Date().toISOString();
          return Commons.update(Publications,publication);
        })
    });
};

ExperienceInterface.update = (experience)=>{
  return Commons.update(Experiences, experience);
};

ExperienceInterface.deleteOne = (id)=>{
  return Commons.getOne(Experiences,id)
  .then((experience)=>{
    return Commons.getOne(Publications, experience.publication)
    .then(publication=>{
      publication.experienceIds.splice(publication.experienceIds.indexOf(experience._id), 1);
        return Commons.update(Publications,publication)
          .then(()=>{
            return Commons.removeOne(Experiences, experience);
          })
    })
  })
};

ExperienceInterface.deleteFromPublication = (id)=>{
  return Commons.removeWithFilter(Experiences,{"publication": id});
};

module.exports = ExperienceInterface;
