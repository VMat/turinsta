const storageService = require('./storageService');

const publicationService = (function(){

  function oPublicationService(){}

  oPublicationService.prototype = {

    getPublications: (searchParams,count,order)=>{
      return new Promise((resolve, reject)=>{
        storageService.getPublications(searchParams,count,order).
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

    patchPublication: (id,fields)=>{
      return new Promise((resolve, reject)=>{
        storageService.patchPublication(id,fields).
          then(patchedPublication=>resolve(patchedPublication)).
          catch(error=>reject(error))
      })
    },

    updatePublication: (publication)=>{
      return new Promise((resolve, reject)=>{
        storageService.updatePublication(publication).
          then(updatedPublication=>resolve(updatedPublication)).
          catch(error=>reject(error))
      })
    },

    deletePublication: (id)=>{
      return new Promise((resolve, reject)=>{
      storageService.deletePublication(id).
        then(deletedPublication=>resolve(deletedPublication)).
        catch(error=>reject(error))
      })
    },

    addPublicationAssessment: (assessment)=>{
      return new Promise((resolve, reject)=>{
      storageService.addPublicationAssessment(assessment).
        then(updatedPublication=>resolve(updatedPublication)).
        catch(error=>reject(error))
      })
    },

    modifyPublicationAssessment: (assessment)=>{
      return new Promise((resolve, reject)=>{
      storageService.modifyPublicationAssessment(assessment).
        then(updatedPublication=>resolve(updatedPublication)).
        catch(error=>reject(error))
      })
    },

    deletePublicationAssessment: (assessment)=>{
      return new Promise((resolve, reject)=>{
      storageService.deletePublicationAssessment(assessment).
        then(updatedPublication=>resolve(updatedPublication)).
        catch(error=>reject(error))
      })
    },

    addPublicationImage: (publicationId, imageUrls)=>{
      return new Promise((resolve, reject)=>{
      storageService.addPublicationImage(publicationId, imageUrls).
        then(updatedPublication=>resolve(updatedPublication)).
        catch(error=>reject(error))
      })
    },

    deletePublicationImage: (publicationId, imageUrl)=>{
      return new Promise((resolve, reject)=>{
      storageService.deletePublicationImage(publicationId, imageUrl).
        then(updatedPublication=>resolve(updatedPublication)).
        catch(error=>reject(error))
      })
    }
  };

  return oPublicationService;

})();

const oPublicationService = new publicationService();

module.exports = oPublicationService;
