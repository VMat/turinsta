const Publications = require('../models/publication');
const Users = require('../models/user');
const Experiences = require('../models/experience');
const Comments = require('../models/comment');
const Commons = require('./commons');

var PublicationInterface = (function(){

  function oPublicationInterface(){}

  oPublicationInterface.prototype = {

    getAll: ()=>{
      return Commons.getAll(Publications)
        .populate('user')
        .populate('experiences')
        .populate('comments')
        .populate('comments.user');
    },

    getOne: (id)=>{
      return Commons.getOne(Publications, id)
        .populate('user')
        .populate('experiences')
        .populate('comments');
    },

    insert: (publication)=>{
      return Commons.insert(new Publications(publication));
    },

    update: (publication)=>{
      return Commons.update(Publications,publication);
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

