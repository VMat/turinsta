const router = require('express').Router();
const publicationService = require('../services/publicationService');

router.get('/count/:count/sort/:field/:way',(req, res)=>{
  console.log("c: " + req.params.count);
  let searchParams = JSON.parse(decodeURI(JSON.stringify(req.query)))
  let orderBy = {...{[req.params.field]: req.params.way}, ...{"timestamps.created": 1}};
  publicationService.getPublications(searchParams,req.params.count,orderBy)
    .then(publications=>{res.status(200).json(publications)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  publicationService.createPublication(req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  publicationService.updatePublication(req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/',(req, res)=>{
  publicationService.deletePublication(req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
