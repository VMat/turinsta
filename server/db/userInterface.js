const Users = require('../models/user');
const Publications = require('../models/publication');
const Commons = require('./commons');

const UserInterface = (function(){

  function oUserInterface(){}

  oUserInterface.prototype = {

    getAll: ()=>{
      return Commons.getAll(Users);
    },

    getOne: (id)=>{
      return Commons.getOne(Users, id)        
        .populate('publications');
    },
    
    insert: (user)=>{
      return Commons.insert(new Users(user));
    },

    update: (user)=>{
      return Commons.update(Users, user);
    }
    
  }

  return oUserInterface;

})();

oUserInterface = new UserInterface();

module.exports = oUserInterface;
