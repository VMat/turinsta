const router = require('express').Router();
const publicationService = require('../services/publicationService');

router.get('/count/:count/sort/:field/:way',(req, res)=>{
  let rowSearchParams = JSON.parse(decodeURI(JSON.stringify(req.query)));
  let searchParams = {};
  for(let i in rowSearchParams){
    searchParams[i] = JSON.parse(rowSearchParams[i]);
  }
  console.log(JSON.stringify(searchParams));
  let orderBy = {...{[req.params.field]: Number(req.params.way)}, ...{"publication.timestamps.created": -1}};
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

router.post('/assessments',(req, res)=>{
  publicationService.addPublicationAssessment(req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/assessments',(req, res)=>{
  publicationService.modifyPublicationAssessment(req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/assessments',(req, res)=>{
  publicationService.deletePublicationAssessment(req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
