let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let InboxService = require('./services/inboxService');
 
io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (data) => {
    socket.nickname = data.nickname;
    socket.inbox = data.inbox;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
    InboxService.saveMessage(socket.inbox,{content: message.text, author: socket.nickname, timestamps: {created: new Date(), modified: null}});
  });
});
 
var port = 3001;
 
http.listen(port, function(){
   console.log('Socket.io is listening on port: ' + port);
});
