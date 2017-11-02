const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');
const activityInterface = require('./activityInterface');

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
    }
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
