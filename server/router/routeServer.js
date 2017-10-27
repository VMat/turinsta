const routeServer = require('express').Router();
const productApi = require('../rest/productApi');

routeServer.get('/', function (req, res){
  res.json(200, {msg: 'OK' });
});

// API REST PRODUCTOS
routeServer.use('/productos', productApi);

module.exports = routeServer;
