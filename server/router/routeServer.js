const routeServer = require('express').Router();
const publicationApi = require('../rest/publicationApi');

routeServer.get('/', function (req, res){
  res.json(200, {msg: 'OK' });
});

// API REST PRODUCTOS
routeServer.use('/productos', publicationApi);

module.exports = routeServer;
