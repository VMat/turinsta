// Set up
const express  = require('express');
const app      = express();                               // create our app w/ express
const mongoose = require('mongoose');                     // mongoose for mongodb
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');

const storageService = require('./services/storageService');
const routeServer = require('./router/routeServer');

const http = require("http");
const socketIo = require("socket.io");

// const inbox = require('./inbox');
const InboxService = require('./services/inboxService');

// Configuration
storageService.connect();

// app.use(morgan('dev'));                                         // log every request to the console
/*app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());*/

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(cors());

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, DELETE, PUT, PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/api', routeServer);
app.use('/', serveStatic(path.join(__dirname, '/../www')));
app.use('/assets', serveStatic(path.join(__dirname, '/assets')));

// views is directory for all template files
app.set('views', __dirname + '/../www');
app.set('view engine', 'html');

app.get('/',(request, response)=>{
  response.render('index');
});

const server = http.createServer(app);
const io = socketIo(server);

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

const port = process.env.PORT || 5001;

server.listen(port, () => console.log(`Listening on port ${port}`));

// listen (start app with node server.js) ======================================
// const listener = app.listen(process.env.PORT || 5001, ()=>{
//     console.log('Listening on port ' + listener.address().port);
// });
