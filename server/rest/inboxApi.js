const router = require('express').Router();
const inboxService = require('../services/inboxService');
const Multer = require('multer');
const imageUploader = require('../services/imageUploader');

const uploadHandler = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

router.get('/user/:user',(req, res)=>{
  inboxService.getInboxes(req.params.user)
    .then(inboxes=>{res.status(200).json(inboxes)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  inboxService.getInbox(req.params.id)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  inboxService.createInbox(req.body)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  inboxService.updateInbox(req.body)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/:id',(req, res)=>{
  inboxService.deleteInbox(req.params.id)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/avatar/user/:user',uploadHandler.any(),imageUploader.genericUploadToGcs,(request, response)=>{
  const cloudStoragePublicUrls = request.files.map((file)=>{return file.cloudStoragePublicUrl});
  if(cloudStoragePublicUrls){
    if(cloudStoragePublicUrls.length>0){
      console.log(cloudStoragePublicUrls[0]);
      response.status(200).json(cloudStoragePublicUrls[0])
    }
    else{
      response.status(500).send("error")
    }
  }
  else{
    response.status(500).send("error")
  }
});

module.exports = router;
