const Users = require('../models/user');
const Publications = require('../models/publication');
const Commons = require('./commons');
const PublicationInterface = require('./publicationInterface');

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
    },
    
    addFavoritePublication: (favorite)=>{
      return Commons.getOne(Users, favorite.user)
        .then((user)=>{
          user.favorites.push(favorite.publication);
          return Commons.update(Users, user)
            .then((updatedUser)=>{
              return PublicationInterface.addPublicationFollower(favorite.publication, favorite.user);
            })
        });
    },
    
    removeFavoritePublication: (favorite)=>{
      return Commons.getOne(Users, favorite.user)
        .then((user)=>{
          user.favorites.splice(user.favorites.indexOf(favorite.publication),1);
          return Commons.update(Users, user)
            .then((updatedUser)=>{
              return PublicationInterface.removePublicationFollower(favorite.publication, favorite.user);
            })
        });
    }
    
  }

  return oUserInterface;

})();

oUserInterface = new UserInterface();

module.exports = oUserInterface;
