const db = require('../db/mongo');

const storageService = (function(){

  function oStorageService(){}

  oStorageService.prototype = {

    connect: ()=>{
      db.connect();
    },

    getPublications: (searchParams,count)=>{
      return db.getPublications(searchParams,count);
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
