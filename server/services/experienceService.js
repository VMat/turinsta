const storageService = require('./storageService');

const experienceService = (function(){

  function oExperienceService(){}

  oExperienceService.prototype = {

    getExperience: (id)=>{
      return new Promise((resolve, reject)=>{
        storageService.getExperience(id).
          then(experiences=>resolve(experiences)).
          catch(error=>reject(error))
      })
    },

    createExperience: (experience)=>{
      return new Promise((resolve, reject)=>{
        storageService.createExperience(experience).
          then(newExperience=>resolve(newExperience)).
          catch(error=>reject(error))
      })
    },

    updateExperience: (experience)=>{
      return new Promise((resolve, reject)=>{
        storageService.updateExperience(experience).
          then(updatedExperience=>resolve(updatedExperience)).
          catch(error=>reject(error))
      })
    },

    deleteExperience: (id)=>{
      return new Promise((resolve, reject)=>{
      storageService.deleteExperience(id).
        then(deletedExperience=>resolve(deletedExperience)).
        catch(error=>reject(error))
      })
    }
  };

  return oExperienceService;

})();

const oExperienceService = new experienceService();

module.exports = oExperienceService;
