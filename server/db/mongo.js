const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');
const activityInterface = require('./activityInterface');
const commentInterface = require('./commentInterface');
const userInterface = require('./userInterface');
const experienceInterface = require('./experienceInterface');

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

    getPublications: (searchParams,count,order)=>{
      return publicationInterface.getN(searchParams,count,order);
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
    
    addPublicationAssessment: (assessment)=>{
      return publicationInterface.addPublicationAssessment(assessment);
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
    
    getExperience: (id)=>{
      return experienceInterface.getOne(id);
    },

    createExperience: (experience)=>{
      return experienceInterface.insert(experience);
    },

    updateExperience: (experience)=>{
      return experienceInterface.update(experience);
    },

    deleteExperience: (experience)=>{
      return experienceInterface.deleteOne(experience);
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
