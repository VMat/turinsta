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

    updatePublication: (publication)=>{
      return db.updatePublication(publication);
    },

    deletePublication: (publication)=>{
      return db.deletePublication(publication);
    },

    addPublicationAssessment: (assessment)=>{
      return db.addPublicationAssessment(assessment);
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

    deleteExperience: (experience)=>{
      return db.deleteExperience(experience);
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
    }

  };

  return oStorageService;

})();

const oStorageService = new storageService();

module.exports = oStorageService;
