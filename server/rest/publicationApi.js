const router = require('express').Router();
const publicationService = require('../services/publicationService');
  
router.get('/',(req, res)=>{
  publicationService.getPublications()
    .then(publications=>{res.status(200).json(publications)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  publicationService.getPublication(req.params.id)
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
  publicationService.deletePublications()
    .then(publications=>{res.status(200).json(publications)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/:id',(req, res)=>{
  publicationService.deletePublication(req.params.id)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;