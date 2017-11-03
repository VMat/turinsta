const routeServer = require('express').Router();
const publicationApi = require('../rest/publicationApi');
const activityApi = require('../rest/activityApi');
const commentApi = require('../rest/commentApi');
const userApi = require('../rest/userApi');

routeServer.get('/', function (req, res){
  res.json(200, {msg: 'OK' });
});

// API REST PUBLICATIONS
routeServer.use('/publications', publicationApi);

// API REST ACTIVITIES
routeServer.use('/activities', activityApi);

// API REST COMMENTS
routeServer.use('/comments', commentApi);

// API REST USERS
routeServer.use('/users', userApi);

module.exports = routeServer;
