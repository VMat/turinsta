const router = require('express').Router();
const placeService = require('../services/placeService');

router.get('/search',(req, res)=>{
  placeService.searchPlace(req.query)
    .then(places=>{res.status(200).json(places)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/',(req, res)=>{
  placeService.getPlaces()
    .then(places=>{res.status(200).json(places)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  placeService.getPlace(req.params.id)
    .then(place=>{res.status(200).json(place)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;