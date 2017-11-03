const db = require('../db/mongo');

const storageService = (function(){

  function oStorageService(){}

  oStorageService.prototype = {

    connect: ()=>{
      db.connect();
    },

    getPublications: ()=>{
      return db.getPublications();
    },

    getPublication: (id)=>{
      return db.getPublication(id);
    },

    createPublication: (publication)=>{
      return db.createPublication(publication);
    },

    updatePublication: (publication)=>{
      return db.updatePublication(publication);
    },

    deletePublications: ()=>{
      return db.deletePublications();
    },

    deletePublication: (id)=>{
      return db.deletePublication(id);
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

    deleteActivity: (id)=>{
      return db.deleteActivity(id);
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
    }

  };

  return oStorageService;

})();

const oStorageService = new storageService();

module.exports = oStorageService;
