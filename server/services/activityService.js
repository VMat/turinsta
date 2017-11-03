const storageService = require('./storageService');

const activityService = (function(){

  function oActivityService(){}
  
  oActivityService.prototype = {
  
    getActivities: ()=>{      
      return new Promise((resolve, reject)=>{
        storageService.getActivities().
          then(activities=>resolve(activities)).
          catch(error=>reject(error))        
      })
    },
    
    getActivity: (id)=>{
      return new Promise((resolve, reject)=>{
        storageService.getActivity(id).
          then(activities=>resolve(activities)).
          catch(error=>reject(error))        
      })                
    },
    
    createActivity: (newActivity)=>{      
      return new Promise((resolve, reject)=>{
        storageService.createActivity(newActivity).
          then(activity=>resolve(activity)).
          catch(error=>reject(error))        
      })
    },
    
    putActivity: (activityToUpdate)=>{
      return new Promise((resolve, reject)=>{
        storageService.updateActivity(activityToUpdate).
          then(activity=>resolve(activity)).
          catch(error=>reject(error))        
      }),
    },
        
    deleteActivity: (id)=>{
      return new Promise((resolve, reject)=>{
        storageService.deleteActivity(id).
          then(activity=>resolve(activity)).
          catch(error=>reject(error))        
      })  
    }
  };

  return oActivityService;

})();

const oActivityService = new activityService();

module.exports = oActivityService;
