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
    },
    
    addUserFollower: (follower)=>{
      return Commons.getOne(Users, follower.follower)
        .then((user)=>{
          user.followedes.push(follower.followed);
          return Commons.update(Users, user)
            .then((updatedUser)=>{
              return Commons.getOne(Users, follower.followed)
                .then((followedUser)=>{
                  followedUser.followers.push(follower.follower);
                  return Commons.update(Users, followedUser)
                });
            })
        });
    },
    
    removeUserFollower: (follower)=>{
      return Commons.getOne(Users, follower.follower)
        .then((followerUser)=>{
          followerUser.followedes.splice(followerUser.followedes.indexOf(follower.followed),1);
          return Commons.update(Users, followerUser)
            .then((updatedUser)=>{
              return Commons.getOne(Users, follower.followed)
                .then((followedUser)=>{
                  followedUser.followers.splice(followedUser.followers.indexOf(follower.follower));
                  return Commons.update(Users, followedUser)
                });
            })
        });
    }
            
  }

  return oUserInterface;

})();

oUserInterface = new UserInterface();

module.exports = oUserInterface;
