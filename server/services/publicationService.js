const storageService = require('./storageService');

let publicationService = {};

publicationService.getPublications = (searchParams,count,order)=>{
  return new Promise((resolve, reject)=>{
    storageService.getPublications(searchParams,count,order).
    then(publications=>resolve(publications)).
    catch(error=>reject(error))
  })
};

publicationService.getPublication = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getPublication(id).
      then(publications=>resolve(publications)).
      catch(error=>reject(error))
  })
};

publicationService.createPublication = (publication)=>{
  console.log("PUBLICATION TO INSERT SERVICE: " + JSON.stringify(publication));
  return new Promise((resolve, reject)=>{
    storageService.createPublication(publication).
      then(newPublication=>resolve(newPublication)).
      catch(error=>reject(error))
  })
};

publicationService.patchPublication = (id,fields)=>{
  return new Promise((resolve, reject)=>{
    storageService.patchPublication(id,fields).
      then(patchedPublication=>resolve(patchedPublication)).
      catch(error=>reject(error))
  })
};

publicationService.updatePublication = (publication)=>{
  return new Promise((resolve, reject)=>{
    storageService.updatePublication(publication).
      then(updatedPublication=>resolve(updatedPublication)).
      catch(error=>reject(error))
  })
};

publicationService.deletePublication = (id)=>{
  return new Promise((resolve, reject)=>{
  storageService.deletePublication(id).
    then(deletedPublication=>resolve(deletedPublication)).
    catch(error=>reject(error))
  })
};

publicationService.addPublicationAssessment = (assessment)=>{
  return new Promise((resolve, reject)=>{
  storageService.addPublicationAssessment(assessment).
    then(updatedPublication=>resolve(updatedPublication)).
    catch(error=>reject(error))
  })
};

publicationService.modifyPublicationAssessment = (assessment)=>{
  return new Promise((resolve, reject)=>{
  storageService.modifyPublicationAssessment(assessment).
    then(updatedPublication=>resolve(updatedPublication)).
    catch(error=>reject(error))
  })
};

publicationService.deletePublicationAssessment = (assessment)=>{
  return new Promise((resolve, reject)=>{
  storageService.deletePublicationAssessment(assessment).
    then(updatedPublication=>resolve(updatedPublication)).
    catch(error=>reject(error))
  })
};

publicationService.addPublicationImage = (publicationId, imageUrls)=>{
  return new Promise((resolve, reject)=>{
  storageService.addPublicationImage(publicationId, imageUrls).
    then(updatedPublication=>resolve(updatedPublication)).
    catch(error=>reject(error))
  })
};

publicationService.deletePublicationImage = (publicationId, imageUrl)=>{
  return new Promise((resolve, reject)=>{
  storageService.deletePublicationImage(publicationId, imageUrl).
    then(updatedPublication=>resolve(updatedPublication)).
    catch(error=>reject(error))
  })
};

publicationService.getPublicationImage = (publicationId, imageUrl)=>{
  return new Promise((resolve, reject)=>{
    storageService.getPublicationImage(publicationId, imageUrl).
    then(image=>resolve(image)).
    catch(error=>reject(error))
  })
};

module.exports = publicationService;
