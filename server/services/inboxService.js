const storageService = require('./storageService');

let inboxService = {};
          
inboxService.getInbox = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getInbox(id).
      then(inbox=>resolve(inbox)).
      catch(error=>reject(error))        
  })                
};
    
inboxService.createInbox = (inbox)=>{      
  return new Promise((resolve, reject)=>{
    storageService.createInbox(inbox).
      then(newInbox=>resolve(newInbox)).
      catch(error=>reject(error))        
  })
};
    
inboxService.updateInbox = (inboxToUpdate)=>{
  return new Promise((resolve, reject)=>{
    storageService.updateInbox(inboxToUpdate).
      then(inbox=>resolve(inbox)).
      catch(error=>reject(error))        
  })
};
        
inboxService.deleteInbox = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.deleteInbox(id).
      then(inbox=>resolve(inbox)).
      catch(error=>reject(error))        
  })  
};

module.exports = inboxService;
