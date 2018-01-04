const router = require('express').Router();
const publicationService = require('../services/publicationService');
const Multer = require('multer');
const multerGoogleStorage = require("multer-google-storage");
//const imageUploader = require('../services/imageUploader');

// Handles the multipart/form-data
// Adds a .file key to the request object
// the 'storage' key saves the image temporarily for in memory
// You can also pass a file path on your server and it will save the image there
const uploadHandler = multer({
  storage: new MulterGoogleCloudStorage({
    filename    : ( req, file, cb )=>{       
      cb( null, file.fieldname + '-' + Date.now() );     
    },
    bucket      : 'tur0000000001', // Required : bucket name to upload 
    projectId      : 'turinsta-189517', // Required : Google project ID 
    keyFilename : '../Turinsta.json' // Required : JSON credentials file for Google Cloud Storage 
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
  //multer.single('image'), imgUpload.uploadToGcs()
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

router.post('/images/publication/:publication',uploadHandler.any(),(request, response, next)=>{
  console.log("Post Image");
  publicationService.addPublicationImage(request.params.publication, request.files)
    .then(publication=>{response.status(200).json(publication)})
    .catch(error=>{response.status(500).send(error)})
  }); 
});

router.delete('/images/publication/:publication/image/:image',(req, res)=>{
  publicationService.deletePublicationImage(req.params.publication, req.params.image)
    .then(publication=>{res.status(200).json(publication)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
