const socketIo = require("socket.io");
let InboxService = require('./services/inboxService');

inboxServer = {};

inboxServer.init = (server)=>{
  const io = socketIo(server);
  
  io.on('connection', (socket) => {

    socket.user = socket.handshake.query.user;
    socket.inbox = socket.handshake.query.inbox;
    
    socket.join(socket.inbox);   

    socket.on('writting', ()=>{
      socket.broadcast.to(socket.inbox).emit('is-writting', {user: socket.user});
    });
    
    socket.on('stop-writting', ()=>{
      socket.broadcast.to(socket.inbox).emit('left-writting', {user: socket.user});
    });
    
    socket.on('add-message', (message) => {
      socket.broadcast.to(socket.inbox).emit('message', {text: message.text, from: socket.user, created: new Date()});
      InboxService.saveMessage(socket.inbox,{content: message.text, author: socket.user, timestamps: {created: new Date(), modified: null}});
    });
  });
};

module.exports = inboxServer;
