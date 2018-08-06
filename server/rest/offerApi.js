const router = require('express').Router();
const offerService = require('../services/offerService');

router.get('/',(req, res)=>{
  offerService.getOffers()
    .then(places=>{res.status(200).json(places)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
