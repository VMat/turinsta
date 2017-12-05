const Publications = require('../models/publication');
const Commons = require('./commons');
const PublicationInterface = require('./publicationInterface');

const ExperienceInterface = (function(){

  function oExperienceInterface(){}

  oExperienceInterface.prototype = {

    getOne: (id)=>{
      return Commons.getOne(Comments, id);
    },

    insert: (experience)=>{
      return Commons.insert(new Experiences(experience))
        .then(insertedExperience=>{
          return PublicationInterface.getOne(insertedExperience.publication)
            .then(publication=>{
              publication.experiences.push(insertedExperience._id);
              return PublicationInterface.update(publication)
            })
        });
    },

    update: (experience)=>{
      return Commons.update(Experiences, experience);
    },

    deleteOne: (id)=>{
      return Commons.getOne(Experiences,id)
        .then(experience=>{
          return Commons.getOne(Publications, experience.publication)
            .then(publication=>{
              publication.experiences.splice(publication.experiences.indexOf(experience._id), 1);
              return PublicationInterface.update(publication)
                .then(()=>{
                  return Commons.removeOne(Experiences, experience);
                })
            })
          }
        })
    }
  };

  return oExperienceInterface;

})();

oExperienceInterface = new ExperienceInterface();

module.exports = oExperienceInterface;
