const db = require('../db/mongo');

const storageService = (function(){

  function oStorageService(){}

  oStorageService.prototype = {

    connect: ()=>{
      db.connect();
    },

    getPublications: (searchParams,count,order)=>{
      return db.getPublications(searchParams,count,order);
    },

    getPublication: (id)=>{
      return db.getPublication(id);
    },

    createPublication: (publication)=>{
      return db.createPublication(publication);
    },

    patchPublication: (id,fields)=>{
      return db.patchPublication(id,fields);
    },
    
    updatePublication: (publication)=>{
      return db.updatePublication(publication);
    },

    deletePublication: (id)=>{
      return db.deletePublication(id);
    },

    addPublicationAssessment: (assessment)=>{
      return db.addPublicationAssessment(assessment);
    },
    
    modifyPublicationAssessment: (assessment)=>{
      return db.modifyPublicationAssessment(assessment)
    },
    
    deletePublicationAssessment: (assessment)=>{
      return db.deletePublicationAssessment(assessment)
    },
    
    addPublicationImage: (publicationId, image)=>{
      return db.addPublicationImage(publicationId, image)
    },
    
    deletePublicationImage: (publicationId, imageUrl)=>{
      return db.deletePublicationImage(publicationId, imageUrl)
    },
    
    getActivities: ()=>{
      return db.getActivities();
    },

    getActivity: (id)=>{
      return db.getActivity(id);
    },

    createActivity: (activity)=>{
      return db.createActivity(activity);
    },

    updateActivity: (activity)=>{
      return db.updateActivity(activity);
    },

    deleteActivity: (activity)=>{
      return db.deleteActivity(activity);
    },

    getComment: (id)=>{
      return db.getComment(id);
    },

    createComment: (comment)=>{
      return db.createComment(comment);
    },

    updateComment: (comment)=>{
      return db.updateComment(comment);
    },

    deleteComment: (id)=>{
      return db.deleteComment(id);
    },

    getExperience: (id)=>{
      return db.getExperience(id);
    },

    createExperience: (experience)=>{
      return db.createExperience(experience);
    },

    updateExperience: (experience)=>{
      return db.updateExperience(experience);
    },

    deleteExperience: (id)=>{
      return db.deleteExperience(id);
    },
    
    getUsers: ()=>{
      return db.getUsers();
    },

    getUser: (id)=>{
      return db.getUser(id);
    },

    createUser: (user)=>{
      return db.createUser(user);
    },

    updateUser: (user)=>{
      return db.updateUser(user);
    },
    
    addFavoritePublication: (favorite)=>{
      return db.addFavoritePublication(favorite);
    },
    
    removeFavoritePublication: (favorite)=>{
      return db.removeFavoritePublication(favorite);
    },
    
    addUserFollower: (follower)=>{
      return db.addUserFollower(follower);
    },
    
    removeUserFollower: (follower)=>{
      return db.removeUserFollower(follower);
    }

  };

  return oStorageService;

})();

const oStorageService = new storageService();

module.exports = oStorageService;
