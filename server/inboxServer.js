const socketIo = require("socket.io");
let InboxService = require('./services/inboxService');

inboxServer = {};

inboxServer.init = (server)=>{
  const io = socketIo(server);
  
  io.on('connection', (socket) => {

    socket.user = socket.handshake.query.user;
    socket.inbox = socket.handshake.query.inbox;
    
    socket.on('disconnect', function(){
      io.emit('users-changed', {user: socket.user, event: 'left'});
    });

    socket.on('add-message', (message) => {
      io.emit('message', {text: message.text, from: socket.user, created: new Date()});
      InboxService.saveMessage(socket.inbox,{content: message.text, author: socket.user, timestamps: {created: new Date(), modified: null}});
    });
  });
};

module.exports = inboxServer;
