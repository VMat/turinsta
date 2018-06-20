const Users = require('../models/user');
const Publications = require('../models/publication');
const Commons = require('./commons');
const NotificationService = require('../services/notificationService');

let UserInterface = {};

UserInterface.getAll = ()=>{
  return Commons.getAll(Users);
};

UserInterface.getOne = (id,fields={})=>{

  if(fields.hasOwnProperty('publications') || Object.keys(fields).length === 0){
    return Commons.getOne(Users, id, fields)
    .populate('publications');
  }

  return Commons.getOne(Users, id, fields);
};

UserInterface.getUserByCredential = (credential)=>{
  return Commons.getN(Users,{"credentials.credential": credential.credential}).
    then((users) => {
      console.log("USERS", users);
      if(users.length){
        const targetCredential = users[0].credentials.filter((userCredential) => {
          return userCredential.networkId === credential.networkId && userCredential.credential === credential.credential;
        });
        return targetCredential.length ? Promise.resolve(users[0]) : Promise.resolve(null);
      }
      return Promise.resolve(null);
    });
};

UserInterface.getFollowedes = (id, n)=>{
  return Commons.getN(Users,{followers: id},n,{username: 1}).
    select({username: 1, avatar: 1});
};

UserInterface.getFavorites = (id, n)=>{
  return Commons.getN(Publications,{followers: id},n,{"timestamps.created": -1})
    .populate('user');
};

UserInterface.insert = (user)=>{
  return Commons.insert(new Users(user));
};

UserInterface.update = (user)=>{
  return Commons.update(Users, user);
};

UserInterface.patch = (id,user)=>{
  return Commons.patch(Users, id, user);
};

UserInterface.addFavoritePublication = (favorite)=>{
  const PublicationInterface = require('./publicationInterface');
  return Commons.getOne(Users, favorite.user)
    .then((user)=>{
      user.favorites.push(favorite.publication);
      return Commons.update(Users, user)
        .then((updatedUser)=>{
          return PublicationInterface.addPublicationFollower(favorite.publication, favorite.user);
        })
    });
};

UserInterface.removeFavoritePublication = (favorite)=>{
  const PublicationInterface = require('./publicationInterface');
  return Commons.getOne(Users, favorite.user)
    .then((user)=>{
      user.favorites.splice(user.favorites.indexOf(favorite.publication),1);
      return Commons.update(Users, user)
        .then((updatedUser)=>{
          return PublicationInterface.removePublicationFollower(favorite.publication, favorite.user);
        })
    });
};

UserInterface.addUserFollower = (follower)=>{
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
};

UserInterface.removeUserFollower = (follower)=>{
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
};

UserInterface.addActivity = (userId,activityId)=>{
  return Commons.getOne(Users,userId)
    .then((user)=>{
      user.notifications.unseenActivities.push(activityId);
      return Commons.update(Users, user);
    });
};

UserInterface.removeActivity = (userId,activityId)=>{
  return Commons.getOne(Users,userId)
    .then((user)=>{
      user.notifications.unseenActivities.splice(user.notifications.unseenActivities.indexOf(activityId),1);
      return Commons.update(Users, user);
    });
};

UserInterface.addUnreadMessage = (userId,updatedInbox)=>{
  const LanguageInterface = require('./languageInterface');
  return Commons.getOne(Users,userId)
    .then((user)=>{
      let message = updatedInbox.messages[updatedInbox.messages.length - 1];
      let inbox = user.notifications.unreadMessages.filter((inbox)=>{return inbox.inbox.equals(updatedInbox._id)});
      if(inbox.length > 0){
        inbox[0].messages.push(message);
      }
      else{
        user.notifications.unreadMessages.push({inbox:updatedInbox._id,messages:[message]});
      }
      return Commons.update(Users, user)
        .then((updatedUser)=>{
          return Commons.getOne(Users,message.author)
            .then((author)=>{
              return LanguageInterface.getCaption(updatedUser.language,["messageNotification"])
                .then((messageCaption)=>{
                  return LanguageInterface.getCaption(updatedUser.language,["summaryTextNotification"])
                    .then((summaryCaption)=>{
                      let notification = {title: messageCaption, body: author.username + ': ' + message.content, summaryText: summaryCaption};
                      let data = {type: 'message', category: updatedInbox._id, key: message._id};
                      NotificationService.send({notification: notification, data: data},[user.notificationKey]);
                      return Promise.resolve(message);
                    })
                })
            })
        })
    });
};

UserInterface.removeUnreadMessages = (userId,inboxId)=>{
  const InboxInterface = require('./inboxInterface');
  return Commons.getOne(Users,userId)
    .then((user)=>{
      let index = null;
      user.notifications.unreadMessages.forEach((inbox,i)=>{if(inbox.inbox.equals(inboxId)){index=i}});
      if(index!=null){
        return Promise.all(user.notifications.unreadMessages[index].messages.map((message)=>{
          return InboxInterface.changeMessageStatus(inboxId,message._id,userId,{name: "READ", date: new Date().toISOString()});
        }))
          .then(()=>{
            console.log('then: ' + user.notifications);
            user.notifications.unreadMessages.splice(index,1);
            return Commons.update(Users, user);
        })
      }
      else{
        return Promise.resolve(user);
      }
    });
};

UserInterface.updateScore = (user)=>{
  return Commons.getOne(Users,user,{publications: 1})
    .populate('publications')
      .then((targetUser)=>{
        let userScoreSum = targetUser.publications.reduce((acum,item)=>{
          return acum + item.score;
        },0);
        return Commons.patch(Users,user,{score: userScoreSum/targetUser.publications.filter((publication)=>{return publication.score}).length})
      });
};

module.exports = UserInterface;
