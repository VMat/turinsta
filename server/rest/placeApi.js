const router = require('express').Router();
const placeService = require('../services/placeService');

router.get('/autoComplete',(req, res)=>{
  placeService.autoCompletePlace(req.query)
    .then(places=>{res.status(200).json(places)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/details',(req, res)=>{
  placeService.getPlaceDetails(req.query)
    .then(places=>{res.status(200).json(places)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/',(req, res)=>{
  let rowSearchParams = JSON.parse(decodeURI(JSON.stringify(req.query)));
  let searchParams = {};
  for(let i in rowSearchParams){
    searchParams[i] = JSON.parse(rowSearchParams[i]);
  }
  placeService.getPlaces(searchParams)
    .then(places=>{res.status(200).json(places)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  placeService.getPlace(req.params.id)
    .then(place=>{res.status(200).json(place)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
