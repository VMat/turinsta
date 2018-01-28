const Inboxes = require('../models/inbox');
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
      inbox.messages.push(message);
      return Commons.update(Inboxes,inbox);
    });
};

module.exports = InboxInterface;
