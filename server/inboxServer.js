const socketIo = require("socket.io");
const InboxService = require('./services/inboxService');
const UserService = require('./services/userService');

let inboxServer = {};

inboxServer.init = (server)=>{
  const io = socketIo(server);

  io.on('connection', (socket) => {

    socket.on('set-inbox', (data)=>{
      socket.user = data.user;
      socket.inbox = data.inbox;
      socket.join(socket.inbox);
    });

    socket.on('writing', ()=>{
      socket.broadcast.to(socket.inbox).emit('is-writing', {user: socket.user});
    });

    socket.on('stop-writing', ()=>{
      socket.broadcast.to(socket.inbox).emit('left-writing', {user: socket.user});
    });

    socket.on('message-received', (data)=>{
      InboxService.changeMessageStatus(socket.inbox,data.message,socket.user,{name:"RECEIVED",date: new Date().toISOString()})
        .then(()=>{
          io.in(socket.inbox).emit('received',{message: data.message, user: socket.user, status: {name:"RECEIVED",date: new Date().toISOString()}});
        });
    });

    socket.on('message-read', (data)=>{
      UserService.removeUnreadMessages(socket.user,socket.inbox)
        .then((updatedUser)=>{
          console.log("updatedUser: " + JSON.stringify(updatedUser));
          if(updatedUser!=null){
            console.log("inbox: " + socket.inbox);
            console.log("unreadMessages: " + JSON.stringify(updatedUser.notifications.unreadMessages));
            let inboxTarget = updatedUser.notifications.unreadMessages.filter((inbox)=>{return inbox.inbox.equals(socket.inbox)});
            if(inboxTarget.length>0){
              console.log("messages: " + JSON.stringify(inboxTarget[0].messages));
              inboxTarget[0].messages.forEach((message)=>{
                io.in(socket.inbox).emit('read',{...data,message: message._id, status: {name:"READ",date: new Date().toISOString()}});
              });
            }
          }
        });
    });

    socket.on('add-message', (message) => {
      InboxService.saveMessage(socket.inbox, {content: message.text, author: socket.user, timestamps: {created: new Date().toISOString(), modified: null}})
        .then((message)=>{
          io.in(socket.inbox).emit('message', message[0]);
        });
    });
  });
};

module.exports = inboxServer;
