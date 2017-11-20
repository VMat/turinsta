const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');
const activityInterface = require('./activityInterface');
const commentInterface = require('./commentInterface');
const userInterface = require('./userInterface');

let db = (function(){

  function oDb(){}

  oDb.prototype = {

    connect: ()=>{

      mongoose.connect(process.env.MONGOLAB_URI, (error)=>{
        if (error)
          console.error(error);
        else
          console.log('mongo connected');
      });
    },

    getPublications: ()=>{
      return publicationInterface.getAll();
    },

    getPublication: (id)=>{
      return publicationInterface.getOne(id);
    },

    createPublication: (publication)=>{
      return publicationInterface.insert(publication);
    },

    updatePublication: (publication)=>{
      return publicationInterface.update(publication);
    },

    deletePublications: ()=>{
      return publicationInterface.deleteAll();
    },

    deletePublication: (id)=>{
      return publicationInterface.deleteOne(id);
    },

    getActivities: ()=>{
      return activityInterface.getAll();
    },

    getActivity: (id)=>{
      return activityInterface.getOne(id);
    },

    createActivity: (activity)=>{
      return activityInterface.insert(activity);
    },

    updateActivity: (activity)=>{
      return activityInterface.update(activity);
    },

    deleteActivity: (id)=>{
      return activityInterface.deleteOne(id);
    },

    getComment: (id)=>{
      return commentInterface.getOne(id);
    },

    createComment: (comment)=>{
      return commentInterface.insert(comment);
    },

    updateComment: (comment)=>{
      return commentInterface.update(comment);
    },

    deleteComment: (id)=>{
      return commentInterface.deleteOne(id);
    },

    getUsers: ()=>{
      return userInterface.getAll();
    },

    getUser: (id)=>{
      return userInterface.getOne(id);
    },

    createUser: (user)=>{
      return userInterface.insert(user);
    },

    updateUser: (user)=>{
      return userInterface.update(user);
    }

  };

  return oDb;
})();

let oDb = new db();

module.exports = oDb;
