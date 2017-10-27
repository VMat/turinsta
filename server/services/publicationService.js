const storageService = require('./storageService');

const publicationService = (function(){

  function oPublicationService(){}
  
  oPublicationService.prototype = {
  
    getPublications: ()=>{      
      return new Promise((resolve, reject)=>{
        storageService.getPublications().
          then(publications=>resolve(publications)).
          catch(error=>reject(error))        
      })
    },
    
    getPublication: (id)=>{
      return new Promise((resolve, reject)=>{
        storageService.getPublication(id).
          then(publications=>resolve(publications)).
          catch(error=>reject(error))        
      })                
    },
    
    createPublication: (publication)=>{
      return new Promise((resolve, reject)=>{
        storageService.createPublication(publication).
          then(newPublication=>resolve(newPublication)).
          catch(error=>reject(error)) 
      })
    },
    
    updatePublication: (id,publication)=>{
      return new Promise((resolve, reject)=>{
        storageService.updatePublication(id,publication).
          then(updatedPublication=>resolve(updatedPublication)).
          catch(error=>reject(error))  
      })
    },
    
    deletePublications: ()=>{
      return new Promise((resolve, reject)=>{
        storageService.deletePublications().
          then(deletedPublications=>resolve(deletedPublications)).
          catch(error=>reject(error))  
      })
    },
    
    deletePublication: (id)=>{
      return new Promise((resolve, reject)=>{
      storageService.deletePublication(id).
        then(deletedPublication=>resolve(deletedPublication)).
        catch(error=>reject(error))  
      })
    }
  };

  return oPublicationService;

})();

const oPublicationService = new publicationService();

module.exports = oPublicationService;
