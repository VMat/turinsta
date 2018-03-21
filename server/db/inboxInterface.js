const Inboxes = require('../models/inbox');
const UserInterface = require('./userInterface');
const Commons = require('./commons');

let InboxInterface = {};

InboxInterface.getN = (user)=>{
  return Commons.getN(Inboxes,{participants:{$elemMatch: {$eq: user}}})
    .populate('participants');
};

InboxInterface.getOne = (id)=>{
  return Commons.getOne(Inboxes, id)
    .populate('participants');
};

InboxInterface.insert = (inbox)=>{
  return Commons.insert(new Inboxes(inbox));
};

InboxInterface.update = (inbox)=>{
  return Commons.update(Inboxes,inbox);
};

InboxInterface.patch = (id, fields)=>{
  return Commons.patch(Inboxes,id,fields);
};

InboxInterface.deleteOne = (id)=>{
  const ImageUploader = require('../services/imageUploader');
  return Commons.getOne(Inboxes,id)
    .then((inbox)=>{
      return UserInterface.getOne(inbox.creator)
        .then((creator)=>{
          return ImageUploader.removeFromGcs(creator.bucketId,inbox.avatar)
            .then(()=>{
              return Commons.removeOne(Inboxes, inbox);
            })
        });
    });
};

InboxInterface.saveMessage = (id,message)=>{
  return Commons.getOne(Inboxes,id)
    .then((inbox)=>{
      let status = inbox.participants.map((user)=>{if(!user.equals(message.author)){return {user: user, name: 'SEND', date: new Date().toISOString()}}});
      inbox.messages.push({...message, status: status.filter((statusItem)=>{return Boolean(statusItem)}), generalState: 'SEND'});
      return Commons.update(Inboxes,inbox)
        .then(()=>{
          return Commons.getOne(Inboxes,id)
            .then((inboxUpdated)=>{
              return Promise.all(inboxUpdated.participants.map((user)=>{
                if(!user.equals(inboxUpdated.messages[inboxUpdated.messages.length - 1].author)){
                  return UserInterface.addUnreadMessage(user,inboxUpdated);
                }
              }).filter((promise)=>{return Boolean(promise)}))
            })
        });
    })
};

InboxInterface.changeMessageStatus = (id,messageId,userId,status)=>{
  return Commons.getOne(Inboxes,id)
    .then((inbox)=>{
      let targetMessage = inbox.messages.filter((message)=>{return message._id.equals(messageId)});
      let targetStatus = targetMessage[0].status.filter((statusItem)=>{return statusItem.user.equals(userId)});
      targetStatus[0].name = status.name;
      targetStatus[0].date = status.date;

      switch(targetMessage[0].generalState){
        case 'SEND': {
          let received = targetMessage[0].status.every((state)=>{
            return state.name == 'RECEIVED'
          });
          if(received){
            targetMessage[0].generalState = 'RECEIVED';
            break;
          }
          let read = targetMessage[0].status.every((state)=>{
            return state.name == 'READ'
          });
          if(read){
            targetMessage[0].generalState = 'READ';
          }
          break;
        }
        case 'RECEIVED':{
          let read = targetMessage[0].status.every((state)=>{
            return state.name == 'READ'
          });
          if(read){
            targetMessage[0].generalState = 'READ';
          }
          break;
        }
        case 'READ':{
          targetMessage[0].status.forEach((statusItem)=>{
            statusItem.name = 'READ';
            statusItem.date = status.date;
          });
          break;
        }
      }

      return Commons.update(Inboxes,inbox);
    });
};

module.exports = InboxInterface;
