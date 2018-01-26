const socketIo = require("socket.io");
let InboxService = require('./services/inboxService');

inboxServer = {};

inboxServer.init = (server)=>{
  const io = socketIo(server);
  
  io.on('connection', (socket) => {

    socket.on('disconnect', function(){
      io.emit('users-changed', {user: socket.nickname, event: 'left'});
    });

    socket.on('set-nickname', (data) => {
      socket.nickname = data.nickname;
      socket.inbox = data.inbox;
      io.emit('users-changed', {user: socket.nickname, event: 'joined'});
    });

    socket.on('add-message', (message) => {
      io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
      InboxService.saveMessage(socket.inbox,{content: message.text, author: socket.nickname, timestamps: {created: new Date(), modified: null}});
    });
  });
};

module.exports = inboxServer;
