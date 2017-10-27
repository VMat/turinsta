// Set up
const express  = require('express');
const app      = express();                               // create our app w/ express
const mongoose = require('mongoose');                     // mongoose for mongodb
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const cors = require('cors');
const path = require('path');

const storageService = require('./services/storageService');
const routeServer = require('./router/routeServer');

// Configuration
storageService.connect();

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/api', routeServer);
app.use(express.static(path.join(__dirname + '/../www')));

// views is directory for all template files
app.set('views', __dirname + '/../www');
app.set('view engine', 'html');

app.get('/',(request, response)=>{
  response.render('index');
});

// listen (start app with node server.js) ======================================
const listener = app.listen(process.env.PORT || 5000, ()=>{
    console.log('Listening on port ' + listener.address().port);
});
