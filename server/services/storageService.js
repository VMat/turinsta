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
    }

  };

  return oStorageService;

})();

const oStorageService = new storageService();

module.exports = oStorageService;
