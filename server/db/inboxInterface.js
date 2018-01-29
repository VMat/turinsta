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
      return Promise.all(inbox.participants.map((user)=>{
        return UserInterface.addUnreadMessage(user,id,message)  
      }))
      .then(()=>{
        inbox.messages.push(message);
        return Commons.update(Inboxes,inbox);
      })
    });
};

InboxInterface.changeStatusMessage = (id,messageId,userId,status)=>{
  return Commons.getOne(Inboxes,id)
    .then((inbox)=>{
      let targetMessage = inbox.messages.filter((message)=>{return message._id == messageId});
      let targetStatus = targetMessage[0].status.filter((statusItem)=>{return statusItem.user == userId});
      targetStatus[0].type = status.type;
      targetStatus[0].date = status.date;
      return Commons.update(Inboxes,inbox);
    });
};

module.exports = InboxInterface;
