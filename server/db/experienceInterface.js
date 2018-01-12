const Publications = require('../models/publication');
const Experiences = require('../models/experience');
const Commons = require('./commons');
const PublicationInterface = require('./publicationInterface');

const ExperienceInterface = (function(){

  function oExperienceInterface(){}

  oExperienceInterface.prototype = {

    getOne: (id)=>{
      return Commons.getOne(Experiences, id);
    },

    insert: (experience)=>{
      experience.score = 0;
      return Commons.insert(new Experiences(experience))
        .then(insertedExperience=>{
          console.log("insertedExperience.publication: " + insertedExperience);
          return Commons.getOne(Publications, insertedExperience.publication)
            .then(publication=>{
              console.log("publication: " + publication._id);
              publication.experienceIds.push(insertedExperience._id);
              return PublicationInterface.update(publication)
            })
        });
    },

    update: (experience)=>{
      return Commons.update(Experiences, experience);
    },

    deleteOne: (id)=>{
      return Commons.getOne(Experiences,id)
      .then((experience)=>{
        return Commons.getOne(Publications, experience.publication)
        .then(publication=>{
          publication.experienceIds.splice(publication.experienceIds.indexOf(experience._id), 1);
            return PublicationInterface.update(publication)
              .then(()=>{
                return Commons.removeOne(Experiences, experience);
              })
        })
      })
    },

    deleteFromPublication: (id)=>{
      return Commons.removeWithFilter(Experiences,{"publication": id});
    }

  };

  return oExperienceInterface;

})();

oExperienceInterface = new ExperienceInterface();

module.exports = oExperienceInterface;
