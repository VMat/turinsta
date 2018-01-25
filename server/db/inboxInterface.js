const Inboxes = require('../models/inbox');
const Commons = require('./commons');

let InboxInterface = {};

InboxInterface.getOne = (id)=>{
  return Commons.getOne(Inbox, id);
};

InboxInterface.insert = (inbox)=>{
  return Commons.insert(new Inboxes(inbox));
};

InboxInterface.update = (inbox)=>{
  return Commons.update(Inboxes,inbox);
};

InboxInterface.deleteOne = (id)=>{
  return Commons.getOne(Inbox,id)
    .then((inbox)=>{
      return Commons.removeOne(Inboxes, inbox);
    });
};

module.exports = InboxInterface;
