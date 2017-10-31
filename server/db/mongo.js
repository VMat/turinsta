const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');

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
    
    updatePublication: (id, publication)=>{
      return publicationInterface.update(id, publication);
    },
    
    deletePublications: ()=>{
      return publicationInterface.deleteAll();
    },
    
    deletePublication: (id)=>{
      return publicationInterface.deleteOne(id);
    }     
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
