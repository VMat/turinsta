const Users = require('../models/user');
const Publications = require('../models/publication');
const Commons = require('./commons');
const PublicationInterface = require('./publicationInterface');
const NotificationService = require('../services/notificationService');

let UserInterface = {};

UserInterface.getAll = ()=>{
  return Commons.getAll(Users);
};

UserInterface.getOne = (id)=>{
  return Commons.getOne(Users, id)
    .populate('publications');
};

UserInterface.insert = (user)=>{
  return Commons.insert(new Users(user));
};

UserInterface.update = (user)=>{
  return Commons.update(Users, user);
};

UserInterface.addFavoritePublication = (favorite)=>{
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
                .then((caption)=>{
                  let title = caption.replace(':inbox',(updatedInbox.name ? updatedInbox.name : author.username));
                  title = "Mensaje nuevo";
                  let notification = {title: title, icon: 'ic_launcher', body: author.username + ': ' + message.content};
                  let data = {type: 'message', category: updatedInbox._id, key: message._id};
                  NotificationService.send({notification: notification, data: data},[user.notificationKey]);
                  return Promise.resolve(message);
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

module.exports = UserInterface;
