const Inboxes = require('../models/inbox');
const UserInterface = require('./userInterface');
const Commons = require('./commons');

let InboxInterface = {};

InboxInterface.getN = (user)=>{
  return Commons.getN(Inboxes,{participants:{$elemMatch: {$eq: user}}});
};

InboxInterface.getOne = (id)=>{
  return Commons.getOne(Inboxes, id);
};

InboxInterface.insert = (inbox)=>{
  return Commons.insert(new Inboxes(inbox));
};

InboxInterface.update = (inbox)=>{
  return Commons.update(Inboxes,inbox);
};

InboxInterface.deleteOne = (id)=>{
  return Commons.getOne(Inboxes,id)
    .then((inbox)=>{
      return Commons.removeOne(Inboxes, inbox);
    });
};

InboxInterface.saveMessage = (id,message)=>{
  return Commons.getOne(Inboxes,id)
    .then((inbox)=>{
      let status = inbox.participants.map((user)=>{if(!user.equals(message.author)){return {user: user, name: null, date: null}}});
      inbox.messages.push({...message, status: status.filter((statusItem)=>{return Boolean(statusItem)})});
      return Commons.update(Inboxes,inbox)
    })
    .then(()=>{
      return Commons.getOne(Inboxes,id)
        .then((inboxUpdated)=>{
          return Promise.all(inboxUpdated.participants.map((user)=>{
            if(!user.equals(inboxUpdated.messages[inboxUpdated.messages.length - 1].author)){
              return UserInterface.addUnreadMessage(user,id,inboxUpdated.messages[inboxUpdated.messages.length - 1]); 
            }            
          }))         
        })
    });
};

InboxInterface.changeMessageStatus = (id,messageId,userId,status)=>{
  return Commons.getOne(Inboxes,id)
    .then((inbox)=>{
      let targetMessage = inbox.messages.filter((message)=>{return message._id.equals(messageId)});
      let targetStatus = targetMessage[0].status.filter((statusItem)=>{return statusItem.user.equals(userId)});
      targetStatus[0].name = status.name;
      targetStatus[0].date = status.date;
      return Commons.update(Inboxes,inbox);
    });
};

module.exports = InboxInterface;
