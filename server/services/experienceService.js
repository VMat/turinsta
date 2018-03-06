const storageService = require('./storageService');

let experienceService = {};

experienceService.getExperience = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getExperience(id).
      then(experiences=>resolve(experiences)).
      catch(error=>reject(error))
  })
};

experienceService.getExperienceCategories = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getExperienceCategories().
      then(experienceCategories=>resolve(experienceCategories)).
      catch(error=>reject(error))
  })
};

experienceService.createExperience = (experience)=>{
  return new Promise((resolve, reject)=>{
    storageService.createExperience(experience).
      then(newExperience=>resolve(newExperience)).
      catch(error=>reject(error))
  })
};

experienceService.updateExperience = (experience)=>{
  return new Promise((resolve, reject)=>{
    storageService.updateExperience(experience).
      then(updatedExperience=>resolve(updatedExperience)).
      catch(error=>reject(error))
  })
};

experienceService.deleteExperience = (id)=>{
  return new Promise((resolve, reject)=>{
  storageService.deleteExperience(id).
    then(deletedExperience=>resolve(deletedExperience)).
    catch(error=>reject(error))
  })
};

module.exports = experienceService;
