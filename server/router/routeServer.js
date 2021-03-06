const routeServer = require('express').Router();
const publicationApi = require('../rest/publicationApi');
const activityApi = require('../rest/activityApi');
const commentApi = require('../rest/commentApi');
const experienceApi = require('../rest/experienceApi');
const userApi = require('../rest/userApi');
const languageApi = require('../rest/languageApi');
const inboxApi = require('../rest/inboxApi');
const placeApi = require('../rest/placeApi');
const complaintApi = require('../rest/complaintApi');
const offerApi = require('../rest/offerApi');

routeServer.get('/', function (req, res){
  res.json(200, {msg: 'OK' });
});

// API REST PUBLICATIONS
routeServer.use('/publications', publicationApi);

// API REST ACTIVITIES
routeServer.use('/activities', activityApi);

// API REST COMMENTS
routeServer.use('/comments', commentApi);

// API REST EXPERIENCES
routeServer.use('/experiences', experienceApi);

// API REST USERS
routeServer.use('/users', userApi);

// API REST LANGUAGES
routeServer.use('/languages', languageApi);

// API REST INBOXES
routeServer.use('/inboxes', inboxApi);

// API REST PLACES
routeServer.use('/places', placeApi);

// API REST COMPLAINTS
routeServer.use('/complaints', complaintApi);

// API REST OFFERS
routeServer.use('/offers', offerApi);

module.exports = routeServer;
