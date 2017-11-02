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
    }
  };

  return oActivityService;

})();

const oActivityService = new activityService();

module.exports = oActivityService;
