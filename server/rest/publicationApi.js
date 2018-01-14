const router = require('express').Router();
const publicationService = require('../services/publicationService');
const path = require('path');
const Multer = require('multer');
const imageUploader = require('../services/imageUploader');

const uploadHandler = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

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

router.patch('/:id',(req, res)=>{
  publicationService.patchPublication(req.params.id,req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  publicationService.updatePublication(req.body)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/:id',(req, res)=>{
  publicationService.deletePublication(req.params.id)
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

router.delete('/assessments/user/:user/publication/:publication',(req, res)=>{
  publicationService.deletePublicationAssessment({user: req.params.user, publication: req.params.publication})
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/images/publication/:publication',uploadHandler.any(),imageUploader.uploadToGcs,(request, response)=>{
  const cloudStoragePublicUrls = request.files.map((file)=>{return file.cloudStoragePublicUrl});
  publicationService.addPublicationImage(request.params.publication, cloudStoragePublicUrls)
    .then(publication=>{response.status(200).json({...publication, images: publication.images.concat(cloudStoragePublicUrls)})})
    .catch(error=>{console.log(error);response.status(500).send(error)})
});

router.delete('/images/publication/:publication/image/:image',(req, res)=>{
  publicationService.deletePublicationImage(req.params.publication, req.params.image)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
