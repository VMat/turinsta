const storageService = require('./storageService');

let activityService = {};
  
activityService.getActivities = ()=>{      
  return new Promise((resolve, reject)=>{
    storageService.getActivities().
      then(activities=>resolve(activities)).
      catch(error=>reject(error))        
  })
};
    
activityService.getActivity = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getActivity(id).
      then(activities=>resolve(activities)).
      catch(error=>reject(error))        
  })                
};
    
activityService.createActivity = (newActivity)=>{      
  return new Promise((resolve, reject)=>{
    storageService.createActivity(newActivity).
      then(activity=>resolve(activity)).
      catch(error=>reject(error))        
  })
};
    
activityService.updateActivity = (activityToUpdate)=>{
  return new Promise((resolve, reject)=>{
    storageService.updateActivity(activityToUpdate).
      then(activity=>resolve(activity)).
      catch(error=>reject(error))        
  })
};
        
activityService.deleteActivity = (activity)=>{
  return new Promise((resolve, reject)=>{
    storageService.deleteActivity(activity).
      then(activity=>resolve(activity)).
      catch(error=>reject(error))        
  })  
};

module.exports = activityService;
