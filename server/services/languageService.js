const storageService = require('./storageService');

let languageService = {};
  
languageService.getLanguages = ()=>{      
  return new Promise((resolve, reject)=>{
    storageService.getLanguages().
      then(languages=>resolve(languages)).
      catch(error=>reject(error))        
  })
};
    
languageService.getLanguage = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getLanguage(id).
      then(language=>resolve(language)).
      catch(error=>reject(error))        
  })                
};
    
module.exports = languageService;
