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
          io.in(socket.inbox).emit('received',{message: data.message, user: socket.user});
        });
    });
    
    socket.on('message-read', (data)=>{
      UserService.removeUnreadMessages(socket.user,socket.inbox)
        .then(()=>{
          io.in(socket.inbox).emit('read',data);
        });
    });

    socket.on('add-message', (message) => {
      InboxService.saveMessage(socket.inbox, {content: message.text, author: socket.user, timestamps: {created: new Date().toISOString(), modified: null}})
        .then(()=>{
          io.in(socket.inbox).emit('message', {content: message.text, author: socket.user, timestamps: {created: new Date().toISOString(), modified: null}});
        });
    });
  });
};

module.exports = inboxServer;
