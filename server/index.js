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
const inboxServer = require('./inboxServer');


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

inboxServer.init(server);

const port = process.env.PORT || 5001;

// listen (start app with node server.js) ======================================
server.listen(port, () => console.log(`Listening on port ${port}`));
