const Publications = require('../models/publication');
const Commons = require('./commons');

var PublicationInterface = (function(){

  function oPublicationInterface(){}

  oPublicationInterface.prototype = {

    getAll: ()=>{
      return Commons.getAll(Publications).populate('user');
    },

    getOne: (id)=>{
      return Commons.getOne(Publications, id).populate('user');
    },

    insert: (publication)=>{
      return Commons.insert(new Publications(publication));
    },

    update: (id, publication)=>{
      return Commons.update(Publications,id,publication);
    },

    deleteAll: ()=>{
      return Commons.removeAll(Publications);
    },

    deleteOne: (id)=>{
      return Commons.removeOne(Publications,id);
    }

  };

  return oPublicationInterface;

})();

oPublicationInterface = new PublicationInterface();

module.exports = oPublicationInterface;

