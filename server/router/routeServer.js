const routeServer = require('express').Router();
const publicationApi = require('../rest/publicationApi');
const activityApi = require('../rest/activityApi');

routeServer.get('/', function (req, res){
  res.json(200, {msg: 'OK' });
});

// API REST PUBLICATIONS
routeServer.use('/publications', publicationApi);

// API REST ACTIVITIES
routeServer.use('/activities', activityApi);

// API REST COMMENTS
routeServer.use('/comments', commentApi);

module.exports = routeServer;
