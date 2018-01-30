const socketIo = require("socket.io");
let InboxService = require('./services/inboxService');

inboxServer = {};

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

    socket.on('add-message', (message) => {
      socket.to(socket.inbox).emit('message', {content: message.text, author: socket.user, timestamps: {created: new Date(), modified: null}});
      InboxService.saveMessage(socket.inbox,{content: message.text, author: socket.user, timestamps: {created: new Date(), modified: null}});
    });
  });
};

module.exports = inboxServer;
