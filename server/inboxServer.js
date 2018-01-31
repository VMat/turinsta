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
      io.in(socket.inbox).emit('received',data);
      InboxService.changeMessageStatus()
    });
    
    socket.on('message-read', (data)=>{
      io.in(socket.inbox).emit('read',data);
      UserService.removeUnreadMessages(socket.user,socket.inbox);
    });

    socket.on('add-message', (message) => {
      InboxService.saveMessage(socket.inbox, {content: message.text, author: socket.user, timestamps: {created: new Date(), modified: null}})
        .then(()=>{
          io.in(socket.inbox).emit('message', {content: message.text, author: socket.user, timestamps: {created: new Date(), modified: null}});
        });
    });
  });
};

module.exports = inboxServer;
